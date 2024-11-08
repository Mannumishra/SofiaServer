const InplantsProduct = require('../Models/InplantsProductModel');
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
const createInplantsProduct = async (req, res) => {
    try {
        const { category, inplants, productName, productDetails, stainlessDetails, titaniumDetails } = req.body;
        const errorMessage = [];

        // Validate required fields
        if (!category) errorMessage.push("Category is required");
        if (!inplants) errorMessage.push("Implants field is required");
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
        const newProduct = new InplantsProduct({
            category,
            inplants,
            productName,
            productDetails,
            stainlessDetails,
            titaniumDetails,
            image: req.file.path // Adjust based on your image upload logic
        });

        await newProduct.save();
        res.status(201).json({ success: true, message: 'Inplants product created successfully', data: newProduct });
    } catch (error) {
        console.error('Error creating Inplants product:', error);
        res.status(500).json({ success: false, message: 'An error occurred while creating the product', error: error.message });
    }
};


// Get all InplantsProducts
const getAllInplantsProducts = async (req, res) => {
    try {
        const products = await InplantsProduct.find().populate("category").populate("inplants");
        if (!products) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            })
        }
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error('Error fetching Inplants products:', error);
        res.status(500).json({ success: false, message: 'An error occurred while fetching products', error: error.message });
    }
};

// Get a single InplantsProduct by ID
const getInplantsProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await InplantsProduct.findById(id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Inplants product not found' });
        }

        res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.error('Error fetching Inplants product:', error);
        res.status(500).json({ success: false, message: 'An error occurred while fetching the product', error: error.message });
    }
};

// Get a single InplantsProduct by inplantsName
const getInplantsProductByName = async (req, res) => {
    try {
        const { name } = req.params;
        const product = await InplantsProduct.findOne({})
            .populate({
                path: 'inplants',
                match: { inplantsName: name } 
            })
            .populate('category');
        if (!product || !product.inplants) {
            return res.status(404).json({ success: false, message: 'Inplants product not found' });
        }

        res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.error('Error fetching Inplants product:', error);
        res.status(500).json({ success: false, message: 'An error occurred while fetching the product', error: error.message });
    }
};
// Update an InplantsProduct by ID
const updateInplantsProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const existingProduct = await InplantsProduct.findById(id);
        if (!existingProduct) {
            return res.status(404).json({ success: false, message: 'Inplants product not found' });
        }

        // Validate required fields
        const errorMessage = [];
        if (!updates.category) errorMessage.push("Category is required");
        if (!updates.inplants) errorMessage.push("Implants field is required");
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
        const updatedProduct = await InplantsProduct.findByIdAndUpdate(id, updates, { new: true });

        res.status(200).json({ success: true, message: 'Inplants product updated successfully', data: updatedProduct });
    } catch (error) {
        console.error('Error updating Inplants product:', error);
        res.status(500).json({ success: false, message: 'An error occurred while updating the product', error: error.message });
    }
};

// Delete an InplantsProduct by ID
const deleteInplantsProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await InplantsProduct.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Inplants product not found' });
        }
        await deleteFile(product.image);
        await InplantsProduct.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: 'Inplants product deleted successfully' });
    } catch (error) {
        console.error('Error deleting Inplants product:', error);
        res.status(500).json({ success: false, message: 'An error occurred while deleting the product', error: error.message });
    }
};

module.exports = {
    createInplantsProduct,
    getAllInplantsProducts,
    getInplantsProductById,
    updateInplantsProduct,
    deleteInplantsProduct,
    getInplantsProductByName
};
