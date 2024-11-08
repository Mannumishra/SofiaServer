const fs = require('fs').promises;
const path = require('path');
const Catalog = require('../Models/CatalogModel');

// Utility function to delete a file if it exists
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
// Controller to create a new catalog
exports.createCatalog = async (req, res) => {
    try {
        if (!req.body.catalogName) {
            if (req.files) {
                if (req.files.catalogImage) {
                    deleteFile(req.files.catalogImage[0].path);
                }
                if (req.files.catalogPDF) {
                    deleteFile(req.files.catalogPDF[0].path);
                }
            }
            return res.status(400).json({
                success: false,
                message: "Catalog Name is required"
            });
        }
        if (!req.files || !req.files.catalogImage || !req.files.catalogPDF) {
            return res.status(400).json({
                success: false,
                message: 'Image and PDF files are required.'
            });
        }
        const catalogImagePath = req.files.catalogImage[0].path;
        const catalogPDFPath = req.files.catalogPDF[0].path;
        const catalog = new Catalog({
            catalogName: req.body.catalogName,
            catalogImage: catalogImagePath,
            catalogPDF: catalogPDFPath
        });
        await catalog.save();
        res.status(201).json({
            success: true,
            message: 'Catalog created successfully!',
            catalog
        });
    } catch (error) {
        console.error('Error creating catalog:', error);
        if (req.files) {
            if (req.files.catalogImage) {
                deleteFile(req.files.catalogImage[0].path);
            }
            if (req.files.catalogPDF) {
                deleteFile(req.files.catalogPDF[0].path);
            }
        }

        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error
        });
    }
};

exports.getAllCatalogs = async (req, res) => {
    try {
        const catalogs = await Catalog.find();
        if (!catalogs) {
            return res.status(404).json({
                success: false,
                message: "Record not found"
            })
        }
        res.status(200).json({ success: true, data: catalogs });
    } catch (error) {
        console.error('Error fetching catalogs:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error });
    }
};

exports.getSingleCatalog = async (req, res) => {
    try {
        const catalog = await Catalog.findById(req.params.id);
        if (!catalog) {
            return res.status(404).json({ success: false, message: 'Catalog not found' });
        }
        res.status(200).json({ success: true, data: catalog });
    } catch (error) {
        console.error('Error fetching catalog:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error });
    }
};

// Update a catalog by ID
exports.updateCatalog = async (req, res) => {
    try {
        const catalog = await Catalog.findById(req.params.id);
        if (!catalog) {
            return res.status(404).json({ success: false, message: 'Catalog not found' });
        }
        if (req.files) {
            if (req.files.catalogImage) {
                deleteFile(catalog.catalogImage);
                catalog.catalogImage = req.files.catalogImage[0].path;
            }
            if (req.files.catalogPDF) {
                deleteFile(catalog.catalogPDF);
                catalog.catalogPDF = req.files.catalogPDF[0].path;
            }
        }
        if (req.body.catalogName) {
            catalog.catalogName = req.body.catalogName;
        }
        await catalog.save();
        res.status(200).json({ success: true, message: 'Catalog updated successfully!', catalog });
    } catch (error) {
        console.error('Error updating catalog:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error });
    }
};

// Delete a catalog by ID
exports.deleteCatalog = async (req, res) => {
    try {
        const catalog = await Catalog.findById(req.params.id);
        if (!catalog) {
            return res.status(404).json({ success: false, message: 'Catalog not found' });
        }
        deleteFile(catalog.catalogImage);
        deleteFile(catalog.catalogPDF);
        await catalog.deleteOne();
        res.status(200).json({ success: true, message: 'Catalog deleted successfully!' });
    } catch (error) {
        console.error('Error deleting catalog:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error });
    }
};