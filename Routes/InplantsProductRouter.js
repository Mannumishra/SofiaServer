const { createInplantsProduct, updateInplantsProduct, getAllInplantsProducts, getInplantsProductById, deleteInplantsProduct, getInplantsProductByName } = require("../Controllers/InplantsProductController")
const upload = require("../Middleware/Multer")

const InplanstProductRouter = require("express").Router()

InplanstProductRouter.post("/create-inplants-product" ,upload.single("image") ,createInplantsProduct)
InplanstProductRouter.put("/update-inplants-product/:id" ,upload.single("image") ,updateInplantsProduct)
InplanstProductRouter.get("/all-inplants-product"  ,getAllInplantsProducts)
InplanstProductRouter.get("/single-inplants-product/:id"  ,getInplantsProductById)
InplanstProductRouter.get("/single-inplants-product-by-name/:name"  ,getInplantsProductByName)
InplanstProductRouter.delete("/delete-inplants-product/:id"  ,deleteInplantsProduct)

module.exports = InplanstProductRouter