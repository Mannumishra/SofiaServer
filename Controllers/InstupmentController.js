const Instument = require("../Models/InstupmentModel");
const fs = require("fs").promises;
const path = require("path");
const InstupmentProduct = require("../Models/InstupmentProductModel");

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
const createInstupment = async (req, res) => {
    try {
        const { categoryName, instupmentName } = req.body;

        if (!categoryName || !instupmentName) {
            if (req.file) deleteFile(req.file.path);
            return res.status(400).json({
                success: false,
                message: "Both category name and inplant name are required"
            });
        }
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Instupment Image is required"
            });
        }

        // Convert inplantsName to uppercase
        const upperCaseName = instupmentName.toUpperCase();

        // Check if an inplant with the same name already exists
        const existingInstupment = await Instument.findOne({ instupmentName: upperCaseName });
        if (existingInstupment) {
            if (req.file) deleteFile(req.file.path);
            return res.status(400).json({
                success: false,
                message: "An Instupment with this name already exists"
            });
        }

        const newInstupment = new Instument({
            categoryName,
            instupmentName: upperCaseName,
            instupmentImage: req.file.path
        });

        await newInstupment.save();
        res.status(201).json({
            success: true,
            message: "Inplant created successfully",
            data: newInstupment
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
const getAllInstupment = async (req, res) => {
    try {
        const instupment = await Instument.find().populate("categoryName");
        if (!instupment) {
            return res.status(404).json({
                success: false,
                message: "Record Not Found"
            });
        }
        res.status(200).json({
            success: true,
            data: instupment.reverse()
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
const getAllInstupmentAfterDetails = async (req, res) => {
    try {
        const InstupmentDetailsData = await InstupmentProduct.find().populate("instupment")
        if (!InstupmentDetailsData) {
            return res.status(400).json({
                success: false,
                message: "Record Not Found"
            })
        }
        const instupment = await Instument.find().populate("categoryName");
        if (!instupment) {
            return res.status(404).json({
                success: false,
                message: "Record Not Found"
            });
        }
        // Extract the inplants names from InplantsProduct that are already used
        const usedInstupmentNames = InstupmentDetailsData.map(item => item.instupment.instupmentName);

        // Filter out inplants that are already used
        const filteredInstupment = instupment.filter(instupment => !usedInstupmentNames.includes(instupment.instupmentName));
        res.status(200).json({
            success: true,
            data: filteredInstupment.reverse()
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
const getSingleInstupment = async (req, res) => {
    try {
        const instupment = await Instument.findById(req.params.id).populate("categoryName");
        if (!instupment) {
            return res.status(404).json({
                success: false,
                message: "Record Not Found"
            });
        }
        res.status(200).json({
            success: true,
            data: instupment
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
const updateInstupment = async (req, res) => {
    try {
        const { id } = req.params;
        const { categoryName, instupmentName } = req.body;

        const instupment = await Instument.findById(id);
        if (!instupment) {
            return res.status(404).json({
                success: false,
                message: "instupment not found"
            });
        }

        // Convert instupmentsName to uppercase if provided
        const upperCaseName = instupmentName ? instupmentName.toUpperCase() : instupment.instupmentName;

        // Check if an instupment with the same name (uppercase) already exists, excluding the current instupment
        if (upperCaseName !== instupment.instupmentName) {
            const existingInstupment = await Instument.findOne({ instupmentName: upperCaseName });
            if (existingInstupment) {
                if (req.file) deleteFile(req.file.path);
                return res.status(400).json({
                    success: false,
                    message: "An inplant with this name already exists"
                });
            }
        }

        // Update fields
        instupment.categoryName = categoryName || instupment.categoryName;
        instupment.instupmentName = upperCaseName;

        if (req.file) {
            deleteFile(instupment.instupmentImage);
            instupment.instupmentImage = req.file.path;
        }

        await instupment.save();
        res.status(200).json({
            success: true,
            message: "Inplant updated successfully",
            data: instupment
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
const deleteInstupment = async (req, res) => {
    try {
        const { id } = req.params;
        const instupment = await Instument.findById(id);

        if (!instupment) {
            return res.status(404).json({
                success: false,
                message: "instupment not found"
            });
        }

        deleteFile(instupment.instupmentImage);  // Delete the image associated with the instupment
        await Instument.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "instupment deleted successfully"
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
    createInstupment,
    getAllInstupment,
    getSingleInstupment,
    updateInstupment,
    deleteInstupment,
    getAllInstupmentAfterDetails
};
