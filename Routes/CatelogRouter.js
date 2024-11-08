const { createCatalog, getAllCatalogs, getSingleCatalog, deleteCatalog, updateCatalog } = require("../Controllers/CatalogController")
const upload = require("../Middleware/Multer")

const CatalogRouter = require("express").Router()


CatalogRouter.post("/create-catalog", upload.fields([
    { name: "catalogImage", maxCount: 1 },
    { name: "catalogPDF", maxCount: 1 },
]), createCatalog)

CatalogRouter.put("/update-catalog/:id", upload.fields([
    { name: "catalogImage", maxCount: 1 },
    { name: "catalogPDF", maxCount: 1 },
]), updateCatalog)

CatalogRouter.get("/all-catalog", getAllCatalogs)
CatalogRouter.get("/single-catalog/:id", getSingleCatalog)
CatalogRouter.delete("/delete-catalog/:id", deleteCatalog)

module.exports = CatalogRouter