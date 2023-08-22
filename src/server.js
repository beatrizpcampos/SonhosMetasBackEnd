import express, { json } from "express"
import routes from "./routes"
const app = express()

app.use(json())
app.use(routes)

app.get("/health", (request, response) => {
    return response.json("up")
})

app.listen(3333)