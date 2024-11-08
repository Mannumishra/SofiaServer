const { createTestimonial, updateTestimonial, getTestimonialById, deleteTestimonial, getAllTestimonials } = require("../Controllers/TestimonialController")
const upload = require("../Middleware/Multer")

const TestimonialRouter = require("express").Router()

TestimonialRouter.post("/add-textimonial", upload.single("image"), createTestimonial)
TestimonialRouter.put("/update-textimonial/:id", upload.single("image"), updateTestimonial)
TestimonialRouter.get("/get-single-textimonial/:id", getTestimonialById)
TestimonialRouter.delete("/delete-textimonial/:id", deleteTestimonial)
TestimonialRouter.get("/all-textimonial", getAllTestimonials)

module.exports = TestimonialRouter