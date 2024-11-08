const { downloadCatalogController } = require("../Controllers/downloadCatalogController")

const DownloadCatelogRouter = require("express").Router()

DownloadCatelogRouter.post("/download-catelog" ,downloadCatalogController)

module.exports = DownloadCatelogRouter