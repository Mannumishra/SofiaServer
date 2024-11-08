const InstupmentProduct = require('../Models/InstupmentProductModel');
const fs = require("fs").promises
const path = require("path")


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
const createInstupmentProduct = async (req, res) => {
    try {
        const { category, instupment, productName, productDetails, stainlessDetails, titaniumDetails } = req.body;
        const errorMessage = [];

        // Validate required fields
        if (!category) errorMessage.push("Category is required");
        if (!instupment) errorMessage.push("Implants field is required");
        if (!productName) errorMessage.push("Product name is required");
        if (!productDetails) errorMessage.push("Product details are required");
        if (!stainlessDetails) errorMessage.push("Stainless details are required");
        if (!titaniumDetails) errorMessage.push("Titanium details are required");
        if (!req.file) errorMessage.push("Image file is required"); // Ensure an image file is provided


        if (errorMessage.length > 0) {
            if (req.file) {
                await deleteFile(req.file.path);
            }
            return res.status(400).json({ success: false, message: 'Validation errors', errors: errorMessage });
        }
        const newProduct = new InstupmentProduct({
            category,
            instupment,
            productName,
            productDetails,
            stainlessDetails,
            titaniumDetails,
            image: req.file.path // Adjust based on your image upload logic
        });

        await newProduct.save();
        res.status(201).json({ success: true, message: 'instupment product created successfully', data: newProduct });
    } catch (error) {
        console.error('Error creating instupment product:', error);
        res.status(500).json({ success: false, message: 'An error occurred while creating the product', error: error.message });
    }
};


// Get all InplantsProducts
const getAllInstupmentProducts = async (req, res) => {
    try {
        const products = await InstupmentProduct.find().populate("category").populate("instupment");
        if (!products) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            })
        }
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error('Error fetching instupment products:', error);
        res.status(500).json({ success: false, message: 'An error occurred while fetching products', error: error.message });
    }
};

// Get a single InplantsProduct by ID
const getInstupmentProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await InstupmentProduct.findById(id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'instupment product not found' });
        }

        res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.error('Error fetching instupment product:', error);
        res.status(500).json({ success: false, message: 'An error occurred while fetching the product', error: error.message });
    }
};

// Get a single InplantsProduct by ID
const getInstupmentProductByName = async (req, res) => {
    try {
        const { name } = req.params;
        const product = await InstupmentProduct.findOne({}).populate({
            path: 'instupment',
            match: { instupmentName: name }
        })
            .populate('category');;

        if (!product) {
            return res.status(404).json({ success: false, message: 'instupment product not found' });
        }

        res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.error('Error fetching instupment product:', error);
        res.status(500).json({ success: false, message: 'An error occurred while fetching the product', error: error.message });
    }
};

// Update an InplantsProduct by ID
const updateInstupmentProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const existingProduct = await InstupmentProduct.findById(id);
        if (!existingProduct) {
            return res.status(404).json({ success: false, message: 'instupment product not found' });
        }

        // Validate required fields
        const errorMessage = [];
        if (!updates.category) errorMessage.push("Category is required");
        if (!updates.instupment) errorMessage.push("instupment field is required");
        if (!updates.productName) errorMessage.push("Product name is required");
        if (!updates.productDetails) errorMessage.push("Product details are required");
        if (!updates.stainlessDetails) errorMessage.push("Stainless details are required");
        if (!updates.titaniumDetails) errorMessage.push("Titanium details are required");

        if (errorMessage.length > 0) {
            return res.status(400).json({ success: false, message: 'Validation errors', errors: errorMessage });
        }
        if (req.file) {
            await deleteFile(existingProduct.image);
            updates.image = req.file.path;
        }

        // Update the product with new data
        const updatedProduct = await InstupmentProduct.findByIdAndUpdate(id, updates, { new: true });

        res.status(200).json({ success: true, message: 'instupment product updated successfully', data: updatedProduct });
    } catch (error) {
        console.error('Error updating instupment product:', error);
        res.status(500).json({ success: false, message: 'An error occurred while updating the product', error: error.message });
    }
};

// Delete an instupmentProduct by ID
const deleteInstupmentProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await InstupmentProduct.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Inplants product not found' });
        }
        await deleteFile(product.image);
        await InstupmentProduct.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: 'Inplants product deleted successfully' });
    } catch (error) {
        console.error('Error deleting Inplants product:', error);
        res.status(500).json({ success: false, message: 'An error occurred while deleting the product', error: error.message });
    }
};

module.exports = {
    createInstupmentProduct,
    getAllInstupmentProducts,
    getInstupmentProductById,
    updateInstupmentProduct,
    deleteInstupmentProduct,
    getInstupmentProductByName
};
