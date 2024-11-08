const mongoose = require("mongoose")

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    profession: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Pending"
    }
}, { timestamps: true })

const Contact = mongoose.model("Contact", ContactSchema)

module.exports = Contact