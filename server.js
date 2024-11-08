const dotenv = require("dotenv")
dotenv.config()

const express = require("express")
const { connectDB } = require("./DB/ConnectDB")
const cors = require("cors")
const CategoryRouter = require("./Routes/CategoryRouter")
const InplantsRouter = require("./Routes/InplantsRouter")
const InstupmentRouter = require("./Routes/InstupmentRouter")
const CatalogRouter = require("./Routes/CatelogRouter")
const InplanstProductRouter = require("./Routes/InplantsProductRouter")
const InstupmentProductRouter = require("./Routes/InstupmentProductRouter")
const DealerShipRouter = require("./Routes/DealerShipRouter")
const ContactRouter = require("./Routes/ContactRouter")
const GetInTouchRouter = require("./Routes/ContactRouter copy")
const DownloadCatelogRouter = require("./Routes/DownloadCatelogRouter")
const TestimonialRouter = require("./Routes/TestimonialRouter")


const app = express()
app.use(cors())

app.use(express.json())
app.set(express.static("./Public"))
app.use("/Public", express.static("Public"))

app.get("/", (req, res) => {
    res.send(`Server Is Running At ${process.env.PORT}`)
})

app.use("/api", CategoryRouter)
app.use("/api", InplantsRouter)
app.use("/api", InstupmentRouter)
app.use("/api", CatalogRouter)
app.use("/api", InplanstProductRouter)
app.use("/api", InstupmentProductRouter)
app.use("/api", DealerShipRouter)
app.use("/api", ContactRouter)
app.use("/api", GetInTouchRouter)
app.use("/api", DownloadCatelogRouter)
app.use("/api", TestimonialRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server Is Running At ${process.env.PORT}`)
})

connectDB()