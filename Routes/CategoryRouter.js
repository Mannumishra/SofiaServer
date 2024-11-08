const { createCategory, updateCategory, getAllCategories, getSingleCategories, deleteCategory } = require("../Controllers/CategoryController")
const upload = require("../Middleware/Multer")

const CategoryRouter = require("express").Router()

CategoryRouter.post("/create-category", upload.single("categoryImage"), createCategory)
CategoryRouter.put("/update-category/:id", upload.single("categoryImage"), updateCategory)
CategoryRouter.get("/get-all-category", getAllCategories)
CategoryRouter.get("/get-category/:id", getSingleCategories)
CategoryRouter.delete("/delete-category/:id", deleteCategory)

module.exports = CategoryRouter