import express from "express"
import cors from "cors"
import session from "express-session";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
config();

const app = express()
const PORT = 3000 || process.env.PORT

//my utils
import responder from "./Utils/respond.js"
import { signup, login } from "./Controller/AuthControler.js"

//my config..
import connectdb from "./Config/connectdb.js"

app.use(cors({
    origin: [],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
}))
app.use(cookieParser())
app.use(session({
    secret: process.env.SESSION_SERECT,
    reverse: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 100,
        httpOnly: true
    }
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Controlers
app.post("/api/signup", signup)
app.post("/api/login", login);

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