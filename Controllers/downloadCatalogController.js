const Catalog = require("../Models/CatalogModel");
const DownloadCatelog = require("../Models/DownLoadCatelogModel");


const downloadCatalogController = async (req, res) => {
    try {
        const { name, email, country, phone, city, profession, catelogId } = req.body; // Use catelogId instead of catelogId

        const errorMessage = [];
        if (!name) errorMessage.push("Name is required");
        if (!email) errorMessage.push("Email is required");
        if (!country) errorMessage.push("Country is required");
        if (!phone) errorMessage.push("Phone is required");
        if (!city) errorMessage.push("City is required");
        if (!profession) errorMessage.push("Profession is required");

        if (errorMessage.length > 0) {
            return res.status(400).json({ success: false, message: errorMessage });
        }

        // Check if catalog exists
        const catalog = await Catalog.findById(catelogId); // Use catelogId here
        if (!catalog) {
            return res.status(404).json({
                success: false,
                message: "Catalog not found"
            });
        }

        // Save download record
        const downloadRecord = new DownloadCatelog({
            catelogId, // Use catelogId here
            name,
            email,
            country,
            phone,
            city,
            profession
        });
        await downloadRecord.save();

        res.status(200).json({
            success: true,
            message: "Thank you for downloading the catalog!",
            catalogUrl: `http://localhost:8000/${catalog.catalogPDF}`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to process your request. Please try again later."
        });
    }
}



module.exports = { downloadCatalogController };
