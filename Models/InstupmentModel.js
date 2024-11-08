const mongoose = require("mongoose")

const InstupmentSchema = new mongoose.Schema({
    categoryName: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: true
    },
    instupmentName: {
        type: String,
        required: true
    },
    instupmentImage: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Instument = mongoose.model("Instupment", InstupmentSchema)

module.exports = Instument