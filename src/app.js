import express from "express"
import morgan from "morgan"
import pkg from "../package.json"
import productRoutes from "./routes/product.routes"
import authRoutes from "./routes/auth.routes"
import usersRoutes from "./routes/user.routes"
import { createRoles } from "./libs/initialSetup"

const app = express()
createRoles()

app.set('pkg', pkg)

app.use(morgan('dev'))
app.use(express.json())

app.get("/", (req, res)=>{
    res.json({
        name:  app.get("pkg").name,
        description:  app.get("pkg").description,
        version:  app.get("pkg").version,
        author:  app.get("pkg").author
    })
})

app.use("/api/products", productRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/users", usersRoutes)

export default app