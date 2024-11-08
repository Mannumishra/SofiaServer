const { createInplant, updateInplant, getAllInplants, getSingleInplant, deleteInplant, getAllInplantsAfterDetails } = require("../Controllers/InplantsController")
const upload = require("../Middleware/Multer")

const InplantsRouter = require("express").Router()

InplantsRouter.post("/create-inplants",upload.single("inplantsImage") ,createInplant)
InplantsRouter.put("/update-inplants/:id",upload.single("inplantsImage") ,updateInplant)
InplantsRouter.get("/all-inplants" ,getAllInplants)
InplantsRouter.get("/all-inplants-details" ,getAllInplantsAfterDetails)
InplantsRouter.get("/inplants/:id" ,getSingleInplant)
InplantsRouter.delete("/delete-inplants/:id" ,deleteInplant)

module.exports = InplantsRouter