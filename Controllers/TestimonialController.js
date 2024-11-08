const Testimonial = require("../Models/TestimonialModel");
const fs = require('fs');
const path = require('path');

// Create a new testimonial with image upload
const createTestimonial = async (req, res) => {
    try {
        const { name, position, details, activeStatus } = req.body;
        const image = req.file ? req.file.path : null;  // If image file is uploaded, store the path

        const newTestimonial = new Testimonial({
            name,
            position,
            details,
            activeStatus: activeStatus || "False",
            image
        });

        const savedTestimonial = await newTestimonial.save();
        res.status(201).json(savedTestimonial);
    } catch (error) {
        console.error("Error creating testimonial:", error);
        res.status(500).json({ message: "Failed to create testimonial" });
    }
};

// Get all testimonials
const getAllTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        res.status(200).json(testimonials);
    } catch (error) {
        console.error("Error fetching testimonials:", error);
        res.status(500).json({ message: "Failed to fetch testimonials" });
    }
};

// Get a single testimonial by ID
const getTestimonialById = async (req, res) => {
    try {
        const { id } = req.params;
        const testimonial = await Testimonial.findById(id);

        if (!testimonial) {
            return res.status(404).json({ message: "Testimonial not found" });
        }

        res.status(200).json(testimonial);
    } catch (error) {
        console.error("Error fetching testimonial:", error);
        res.status(500).json({ message: "Failed to fetch testimonial" });
    }
};

const updateTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, position, details, activeStatus } = req.body;
        const newImage = req.file ? req.file.path : undefined;

        // Fetch the existing testimonial to check if there’s an old image
        const existingTestimonial = await Testimonial.findById(id);
        if (!existingTestimonial) {
            return res.status(404).json({ message: "Testimonial not found" });
        }

        // If a new image is uploaded, delete the old image file
        if (newImage && existingTestimonial.image) {
            fs.unlink(path.join(__dirname, '..', existingTestimonial.image), (err) => {
                if (err) {
                    console.error("Error deleting old image:", err);
                } else {
                    console.log("Old image deleted successfully");
                }
            });
        }

        // Prepare the updated data
        const updateData = { name, position, details, activeStatus };
        if (newImage) {
            updateData.image = newImage;
        }

        // Update the testimonial in the database
        const updatedTestimonial = await Testimonial.findByIdAndUpdate(id, updateData, { new: true });

        res.status(200).json(updatedTestimonial);
    } catch (error) {
        console.error("Error updating testimonial:", error);
        res.status(500).json({ message: "Failed to update testimonial" });
    }
};

// Delete a testimonial by ID
const deleteTestimonial = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the testimonial to get the image path
        const testimonial = await Testimonial.findById(id);

        if (!testimonial) {
            return res.status(404).json({ message: "Testimonial not found" });
        }

        // Check if the testimonial has an image, then delete it from the file system
        if (testimonial.image) {
            // Assuming `testimonial.image` contains the relative path to the image
            const imagePath = path.join(__dirname, '..', testimonial.image); // Adjust path as needed

            // Check if the file exists before attempting to delete
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath); // Delete the image file
            } else {
                console.warn(`Image not found at path: ${imagePath}`);
            }
        }

        // Delete the testimonial from the database
        await Testimonial.findByIdAndDelete(id);

        res.status(200).json({ message: "Testimonial and associated image deleted successfully" });
    } catch (error) {
        console.error("Error deleting testimonial:", error);
        res.status(500).json({ message: "Failed to delete testimonial" });
    }
};

module.exports = {
    createTestimonial,
    getAllTestimonials,
    getTestimonialById,
    updateTestimonial,
    deleteTestimonial
};
