import "express-async-errors"
import express from "express"
import { AppDataSource } from "./data-source"
import routes from "./routes"
import { errorMiddleware } from './middlewares/error'
const cors = require("cors")

AppDataSource.initialize().then(()=>{
    const app = express()
    app.use(express.json())

    app.use(cors({ credentials: true, origin: "http://localhost:3000" }))

    app.use(routes)

    app.use(errorMiddleware)

    return app.listen(process.env.PORT)
})