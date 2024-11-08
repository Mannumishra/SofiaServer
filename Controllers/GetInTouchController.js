const GetinTouch = require('../Models/GetinTouchModel'); 

const createGetInTouch = async (req, res) => {
    try {
        const { name, phone, email, country, message } = req.body;

        const errorMessage = [];

        // Validate required fields
        if (!name) errorMessage.push("Name is required.");
        if (!phone) errorMessage.push("Phone is required.");
        if (!email) errorMessage.push("Email is required.");
        if (!country) errorMessage.push("Country is required.");
        if (!message) errorMessage.push("Message is required.");

        // If there are validation errors, return them in the response
        if (errorMessage.length > 0) {
            return res.status(400).json({ message: 'Validation error.', errors: errorMessage });
        }

        const newGetInTouch = new GetinTouch({
            name,
            phone,
            email,
            country,
            message
        });

        // Save the new contact record
        const savedGetInTouch = await newGetInTouch.save();

        res.status(201).json({
            message: 'GetInTouch created successfully.',
            data: savedGetInTouch,
        });
    } catch (error) {
        console.error("Error creating GetInTouch:", error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Controller to get all GetInTouch records
const getAllGetInTouch = async (req, res) => {
    try {
        const GetInTouchs = await GetinTouch.find();
        if (!GetInTouchs) {
            return res.status(404).json({
                success: false,
                message: "No records found"
            });
        }
        res.status(200).json({
            message: 'All GetInTouchs fetched successfully.',
            data: GetInTouchs.reverse(),
        });
    } catch (error) {
        console.error("Error fetching GetInTouchs:", error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Controller to update only the status field of a GetInTouch
const updateGetInTouchStatus = async (req, res) => {
    const { id } = req.params; // Get the GetInTouch ID from the URL params
    const { status } = req.body; // Get the new status from the request body

    try {
        if (!status) {
            return res.status(400).json({ message: 'Status is required.' });
        }
        const updatedGetInTouch = await GetinTouch.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true } // Return the updated document and validate input
        );
        if (!updatedGetInTouch) {
            return res.status(404).json({ message: 'GetInTouch not found.' });
        }

        res.status(200).json({
            message: 'Status updated successfully.',
            data: updatedGetInTouch,
        });
    } catch (error) {
        console.error("Error updating GetInTouch status:", error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = {
    createGetInTouch,
    getAllGetInTouch,
    updateGetInTouchStatus, // Include this if you're also exporting the status update function
};
