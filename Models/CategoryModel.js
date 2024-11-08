const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    },
    categoryImage: {
        type: String,
        required: true
    },
    categoryStatus: {
        type: String,
        default: "False"
    }
},{timestamps:true})

const category = mongoose.model("Category" ,categorySchema)

module.exports = category