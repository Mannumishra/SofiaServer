const { createDealerShip, getAllDealerShips, updateDealerShipStatus } = require("../Controllers/DealerShipController")

const DealerShipRouter = require("express").Router()

DealerShipRouter.post("/send-dealership" ,createDealerShip)
DealerShipRouter.get("/all-dealership" ,getAllDealerShips)
DealerShipRouter.put("/update-dealership-status/:id" ,updateDealerShipStatus)

module.exports = DealerShipRouter