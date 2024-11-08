const mongoose = require("mongoose")

const DealerShipSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    companyNumber: {
        type: Number,
        required: true
    },
    companyEmail: {
        type: String,
        required: true
    },
    companyCountry: {
        type: String,
        required: true
    },
    companyCity: {
        type: String,
        required: true
    },
    companyAddress: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Pending"
    }
}, { timestamps: true })

const DealerShip = mongoose.model("DealerShip", DealerShipSchema)

module.exports = DealerShip