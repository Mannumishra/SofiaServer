const Category = require("../Models/CategoryModel");
const fs = require("fs").promises;
const path = require("path");
const category = require("../Models/CategoryModel");
const Inplants = require("../Models/InplantsModel");
const Instument = require("../Models/InstupmentModel");

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

// Create a new category
const createCategory = async (req, res) => {
    try {
        const { categoryName, categoryStatus } = req.body;
        if (!categoryName) {
            if (req.file) deleteFile(req.file.path);
            return res.status(400).json({
                success: false,
                message: "Category Name is required"
            });
        }
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Category Image is required"
            });
        }

        const upperCase = categoryName.toUpperCase()
        const exitCategory = await category.findOne({ categoryName: upperCase })
        if (exitCategory) {
            if (req.file) deleteFile(req.file.path);
            return res.status(400).json({
                success: false,
                message: "This Category Name is already exits."
            })
        }

        const newCategory = new Category({
            categoryName: upperCase,
            categoryImage: req.file.path,
            categoryStatus
        });

        await newCategory.save();
        res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: newCategory
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Get all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        if (!categories) {
            return res.status(404).json({
                success: false,
                message: "Record Not Found"
            })
        }
        res.status(200).json({
            success: true,
            data: categories.reverse()
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


const getSingleCategories = async (req, res) => {
    try {
        const categories = await Category.findById(req.params.id);
        if (!categories) {
            return res.status(404).json({
                success: false,
                message: "Record Not Found"
            })
        }
        res.status(200).json({
            success: true,
            data: categories
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Update a category
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { categoryName, categoryStatus } = req.body;
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }
        if (req.file) {
            deleteFile(category.categoryImage);
            category.categoryImage = req.file.path;
        }
        const upperCaseName = categoryName ? categoryName.toUpperCase() : category.categoryName;

        if (upperCaseName != category.categoryName) {
            const exitCategory = await Category.findOne({ categoryName: upperCaseName })
            if (exitCategory) {
                return res.status(400).json({
                    success: false,
                    message: "This Category Name is Already Exist"
                })
            }
        }

        category.categoryName = upperCaseName;
        category.categoryStatus = categoryStatus || category.categoryStatus;

        await category.save();
        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: category
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Delete a category
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        // Check karein agar koi Inplants ya Instupment is category se related hain ya nahi
        const relatedInplants = await Inplants.findOne({ categoryName: id });
        const relatedInstupment = await Instument.findOne({ categoryName: id });

        if (relatedInplants || relatedInstupment) {
            return res.status(400).json({
                success: false,
                message: "Cannot delete category as it has related Inplants or Instupments"
            });
        }
        deleteFile(category.categoryImage);  // Delete the image associated with the category
        await Category.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Category deleted successfully"
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
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
    getSingleCategories
};
