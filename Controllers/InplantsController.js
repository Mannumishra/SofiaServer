const Inplant = require("../Models/InplantsModel");
const fs = require("fs").promises;
const path = require("path");
const InplantsProduct = require("../Models/InplantsProductModel");

const deleteFile = async (filePath) => {
    try {
        if (filePath) {
            const fileToDelete = path.join(__dirname, "..", filePath);
            await fs.access(fileToDelete); // Check if file exists
            await fs.unlink(fileToDelete); // Delete the file
            console.log("Deleted file:", filePath);
        }
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.log("File not found or already deleted:", filePath);
        } else {
            console.error("Error deleting file:", err);
        }
    }
};

// Create a new inplant
const createInplant = async (req, res) => {
    try {
        const { categoryName, inplantsName } = req.body;

        if (!categoryName || !inplantsName) {
            if (req.file) deleteFile(req.file.path);
            return res.status(400).json({
                success: false,
                message: "Both category name and inplant name are required"
            });
        }
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Inplant Image is required"
            });
        }

        // Convert inplantsName to uppercase
        const upperCaseName = inplantsName.toUpperCase();

        // Check if an inplant with the same name already exists
        const existingInplant = await Inplant.findOne({ inplantsName: upperCaseName });
        if (existingInplant) {
            if (req.file) deleteFile(req.file.path);
            return res.status(400).json({
                success: false,
                message: "An inplant with this name already exists"
            });
        }

        const newInplant = new Inplant({
            categoryName,
            inplantsName: upperCaseName,
            inplantsImage: req.file.path
        });

        await newInplant.save();
        res.status(201).json({
            success: true,
            message: "Inplant created successfully",
            data: newInplant
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Get all inplants
const getAllInplants = async (req, res) => {
    try {
        const inplants = await Inplant.find().populate("categoryName");
        if (!inplants) {
            return res.status(404).json({
                success: false,
                message: "Record Not Found"
            });
        }
        res.status(200).json({
            success: true,
            data: inplants.reverse()
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


// Get all inplants
const getAllInplantsAfterDetails = async (req, res) => {
    try {
        const InplantsDetailsData = await InplantsProduct.find().populate("inplants")
        if (!InplantsDetailsData) {
            return res.status(400).json({
                success: false,
                message: "Record Not Found"
            })
        }
        const inplants = await Inplant.find().populate("categoryName");
        if (!inplants) {
            return res.status(404).json({
                success: false,
                message: "Record Not Found"
            });
        }
        // Extract the inplants names from InplantsProduct that are already used
        const usedInplantNames = InplantsDetailsData.map(item => item.inplants.inplantsName);

        // Filter out inplants that are already used
        const filteredInplants = inplants.filter(inplant => !usedInplantNames.includes(inplant.inplantsName));
        res.status(200).json({
            success: true,
            data: filteredInplants.reverse()
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Get a single inplant by ID
const getSingleInplant = async (req, res) => {
    try {
        const inplant = await Inplant.findById(req.params.id).populate("categoryName");
        if (!inplant) {
            return res.status(404).json({
                success: false,
                message: "Record Not Found"
            });
        }
        res.status(200).json({
            success: true,
            data: inplant
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Update an inplant
const updateInplant = async (req, res) => {
    try {
        const { id } = req.params;
        const { categoryName, inplantsName } = req.body;
        console.log(req.body)
        console.log('Type of categoryName:', typeof categoryName);

        const inplant = await Inplant.findById(id);
        if (!inplant) {
            return res.status(404).json({
                success: false,
                message: "Inplant not found"
            });
        }

        // Convert inplantsName to uppercase if provided
        const upperCaseName = inplantsName ? inplantsName.toUpperCase() : inplant.inplantsName;

        // Check if an inplant with the same name (uppercase) already exists, excluding the current inplant
        if (upperCaseName !== inplant.inplantsName) {
            const existingInplant = await Inplant.findOne({ inplantsName: upperCaseName });
            if (existingInplant) {
                if (req.file) deleteFile(req.file.path);
                return res.status(400).json({
                    success: false,
                    message: "An inplant with this name already exists"
                });
            }
        }

        // Update fields
        inplant.categoryName = categoryName || inplant.categoryName;
        inplant.inplantsName = upperCaseName;

        if (req.file) {
            deleteFile(inplant.inplantsImage);
            inplant.inplantsImage = req.file.path;
        }

        await inplant.save();
        res.status(200).json({
            success: true,
            message: "Inplant updated successfully",
            data: inplant
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


// Delete an inplant
const deleteInplant = async (req, res) => {
    try {
        const { id } = req.params;
        const inplant = await Inplant.findById(id);

        if (!inplant) {
            return res.status(404).json({
                success: false,
                message: "Inplant not found"
            });
        }

        deleteFile(inplant.inplantsImage);  // Delete the image associated with the inplant
        await Inplant.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Inplant deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    createInplant,
    getAllInplants,
    getSingleInplant,
    updateInplant,
    deleteInplant,
    getAllInplantsAfterDetails
};
