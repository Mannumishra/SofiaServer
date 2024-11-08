const mongoose = require("mongoose");

const downloadCatalogSchema = new mongoose.Schema({
    catelogId: {
        type: mongoose.Schema.ObjectId,
        ref: "catalog",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    profession: {
        type: String,
        required: true
    }
}, { timestamps: true });

const DownloadCatelog = mongoose.model("DownloadCatalog", downloadCatalogSchema);

module.exports = DownloadCatelog
