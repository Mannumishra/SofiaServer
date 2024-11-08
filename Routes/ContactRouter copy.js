const { createGetInTouch, getAllGetInTouch, updateGetInTouchStatus } = require("../Controllers/GetInTouchController")


const GetInTouchRouter = require("express").Router()

GetInTouchRouter.post("/send-getintouch" ,createGetInTouch)
GetInTouchRouter.get("/all-getintouch" ,getAllGetInTouch)
GetInTouchRouter.put("/update-getintouch-status/:id" ,updateGetInTouchStatus)

module.exports = GetInTouchRouter