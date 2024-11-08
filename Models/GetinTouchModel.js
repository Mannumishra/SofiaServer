const mongoose = require("mongoose")

const GetinTouchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
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
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Pending"
    }
}, { timestamps: true })

const GetinTouch = mongoose.model("GetinTouch", GetinTouchSchema)

module.exports = GetinTouch