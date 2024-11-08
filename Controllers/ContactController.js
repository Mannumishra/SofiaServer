const Contact = require('../Models/ContactModel'); // Make sure to import your Contact model

const createContact = async (req, res) => {
    try {
        const {
            name,
            profession,
            email,
            country,
            city,
            subject,
            message
        } = req.body;

        const errorMessage = [];

        // Validate required fields
        if (!name) errorMessage.push("Name is required.");
        if (!profession) errorMessage.push("Profession is required.");
        if (!email) errorMessage.push("Email is required.");
        if (!country) errorMessage.push("Country is required.");
        if (!city) errorMessage.push("City is required.");
        if (!subject) errorMessage.push("Subject is required.");
        if (!message) errorMessage.push("Message is required.");

        // If there are validation errors, return them in the response
        if (errorMessage.length > 0) {
            return res.status(400).json({ message: 'Validation error.', errors: errorMessage });
        }

        const newContact = new Contact({
            name,
            profession,
            email,
            country,
            city,
            subject,
            message
        });

        // Save the new contact record
        const savedContact = await newContact.save();

        res.status(201).json({
            message: 'Contact created successfully.',
            data: savedContact,
        });
    } catch (error) {
        console.error("Error creating contact:", error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Controller to get all contact records
const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        if (!contacts) {
            return res.status(404).json({
                success: false,
                message: "No records found"
            });
        }
        res.status(200).json({
            message: 'All contacts fetched successfully.',
            data: contacts.reverse(),
        });
    } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Controller to update only the status field of a contact
const updateContactStatus = async (req, res) => {
    const { id } = req.params; // Get the contact ID from the URL params
    const { status } = req.body; // Get the new status from the request body

    try {
        if (!status) {
            return res.status(400).json({ message: 'Status is required.' });
        }
        const updatedContact = await Contact.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true } // Return the updated document and validate input
        );
        if (!updatedContact) {
            return res.status(404).json({ message: 'Contact not found.' });
        }

        res.status(200).json({
            message: 'Status updated successfully.',
            data: updatedContact,
        });
    } catch (error) {
        console.error("Error updating contact status:", error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = {
    createContact,
    getAllContacts,
    updateContactStatus, // Include this if you're also exporting the status update function
};
