const DealerShip = require('../Models/DealerShipModel');

// Controller to create a new dealership record
const createDealerShip = async (req, res) => {
    try {
        const { companyName, companyNumber, companyEmail, companyCountry, companyCity, companyAddress } = req.body;
        const errorMessage = [];

        // Validate required fields
        if (!companyName) errorMessage.push("Company Name is required.");
        if (!companyNumber) errorMessage.push("Company Number is required.");
        if (!companyEmail) errorMessage.push("Company Email is required.");
        if (!companyCountry) errorMessage.push("Company Country is required.");
        if (!companyCity) errorMessage.push("Company City is required.");
        if (!companyAddress) errorMessage.push("Company Address is required.");

        // If there are validation errors, return them in the response
        if (errorMessage.length > 0) {
            return res.status(400).json({ message: 'Validation error.', errors: errorMessage });
        }
        const newDealerShip = new DealerShip({
            companyName,
            companyNumber,
            companyEmail,
            companyCountry,
            companyCity,
            companyAddress
        });

        // Save the new dealership record
        const savedDealerShip = await newDealerShip.save();

        res.status(201).json({
            message: 'Dealership created successfully.',
            data: savedDealerShip,
        });
    } catch (error) {
        console.error("Error creating dealership:", error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Controller to get all dealership records
const getAllDealerShips = async (req, res) => {
    try {
        const dealerShips = await DealerShip.find();
        if (!dealerShips) {
            return res.status(404).json({
                success: false,
                message: "Record Not Found"
            })
        }
        res.status(200).json({
            message: 'All dealerships fetched successfully.',
            data: dealerShips.reverse(),
        });
    } catch (error) {
        console.error("Error fetching dealerships:", error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};


// Controller to update only the status field
const updateDealerShipStatus = async (req, res) => {
    const { id } = req.params; // Get the dealership ID from the URL params
    const { status } = req.body; // Get the new status from the request body
    try {
        if (!status) {
            return res.status(400).json({ message: 'Status is required.' });
        }
        const updatedDealerShip = await DealerShip.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true } // Return the updated document and validate input
        );
        if (!updatedDealerShip) {
            return res.status(404).json({ message: 'Dealership not found.' });
        }

        res.status(200).json({
            message: 'Status updated successfully.',
            data: updatedDealerShip,
        });
    } catch (error) {
        console.error("Error updating dealership status:", error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};


module.exports = {
    createDealerShip,
    getAllDealerShips,
    updateDealerShipStatus, // Include this if you're also exporting the status update function
};
