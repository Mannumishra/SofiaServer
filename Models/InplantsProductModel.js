const mongoose = require("mongoose")

const InplantsProductSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: true
    },
    inplants: {
        type: mongoose.Schema.ObjectId,
        ref: "Inplant",
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productDetails: {
        type: String,
        required: true
    },
    stainlessDetails: {
        type: String,
        required: true
    },
    titaniumDetails: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

const InplantsProduct = mongoose.model("InplantsProduct", InplantsProductSchema)

module.exports = InplantsProduct