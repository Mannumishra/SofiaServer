const mongoose = require("mongoose")

const InplantsSchema = new mongoose.Schema({
    categoryName: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: true
    },
    inplantsName: {
        type: String,
        required: true
    },
    inplantsImage: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Inplants = mongoose.model("Inplant", InplantsSchema)

module.exports = Inplants