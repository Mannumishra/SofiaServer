
const { createInstupmentProduct, updateInstupmentProduct, getAllInstupmentProducts, getInstupmentProductById, deleteInstupmentProduct, getInstupmentProductByName } = require("../Controllers/InstupmentProductController")
const upload = require("../Middleware/Multer")

const InstupmentProductRouter = require("express").Router()

InstupmentProductRouter.post("/create-instupment-product" ,upload.single("image") ,createInstupmentProduct)
InstupmentProductRouter.put("/update-instupment-product/:id" ,upload.single("image") ,updateInstupmentProduct)
InstupmentProductRouter.get("/all-instupment-product"  ,getAllInstupmentProducts)
InstupmentProductRouter.get("/single-instupment-product/:id"  ,getInstupmentProductById)
InstupmentProductRouter.get("/single-instupment-product-name/:name"  ,getInstupmentProductByName)
InstupmentProductRouter.delete("/delete-instupment-product/:id"  ,deleteInstupmentProduct)

module.exports = InstupmentProductRouter