const mongoose = require("mongoose")

const CatalogSchema = new mongoose.Schema({
    catalogName: {
        type: String,
        required: true
    },
    catalogImage: {
        type: String,
        required: true
    },
    catalogPDF: {
        type: String,
        required: true
    }
})

const Catalog = mongoose.model("catalog" ,CatalogSchema)

module.exports = Catalog