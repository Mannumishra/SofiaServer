const mongoose = require("mongoose")

const TestimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    activeStatus: {
        type: String,
        default: "False"
    },
    image: {
        type: String,
    }
})

const Testimonial = mongoose.model("Testimonial", TestimonialSchema)

module.exports = Testimonial