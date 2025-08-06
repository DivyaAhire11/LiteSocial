import express from "express"
import { config } from "dotenv";
config();

const app = express()
const PORT = 3000 || process.env.PORT

//my utils
import responder from "./Utils/respond.js"
import { signup } from "./Controller/AuthControler.js"

//my config
import connectdb from "./Config/connectdb.js"

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post("/api/signup", signup)


app.get("/", (req, res) => {
    return responder(res, null, 200, true, "success")
})

app.get("/health", (req, res) => {
    responder(res, null, 200, true, "server is running healthy")
})

app.listen(PORT, () => {
    console.log(`Server run on port ${PORT}`)
    connectdb();
})