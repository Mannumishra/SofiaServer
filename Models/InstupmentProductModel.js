const mongoose = require("mongoose")

const InstupmentProductSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: true
    },
    instupment: {
        type: mongoose.Schema.ObjectId,
        ref: "Instupment",
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

const InstupmentProduct = mongoose.model("InstupmentProduct", InstupmentProductSchema)

module.exports = InstupmentProduct