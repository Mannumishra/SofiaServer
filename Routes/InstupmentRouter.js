const { createInstupment, updateInstupment, getAllInstupment, getSingleInstupment, deleteInstupment, getAllInstupmentAfterDetails } = require("../Controllers/InstupmentController")
const upload = require("../Middleware/Multer")

const InstupmentRouter = require("express").Router()


InstupmentRouter.post("/create-instupment", upload.single("instupmentImage"), createInstupment)
InstupmentRouter.put("/update-instupment/:id", upload.single("instupmentImage"), updateInstupment)
InstupmentRouter.get("/all-instupment", getAllInstupment)
InstupmentRouter.get("/all-instupment-after-details", getAllInstupmentAfterDetails)
InstupmentRouter.get("/single-instupment/:id", getSingleInstupment)
InstupmentRouter.delete("/delete-instupment/:id", deleteInstupment)



module.exports = InstupmentRouter