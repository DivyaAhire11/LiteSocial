import express from "express"
import cors from "cors"
import session from "express-session";

//fs = file system(package)bydefault install in nodejs

import cookieParser from "cookie-parser";
import { config } from "dotenv";
config();

//Controller
import { signup, login } from "./Controller/AuthControler.js"
import { uploadProfile } from "./Controller/postPicControl.js";

//my utils
import responder from "./Utils/respond.js"

//my config..
import connectdb from "./Config/connectdb.js"
import imageKitConfig from "./Config/ImageKitConfig.js";
let imagekit = imageKitConfig();

//middleware
import upload from "./middleware/multer.js";

const app = express()
const PORT = 3000 || process.env.PORT

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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


//Controlers
app.post("/api/signup", signup)
app.post("/api/login", login);
app.post("/api/uploadProfile", upload.single("ProfileImg"), uploadProfile) //upload image on cloud

app.post("/api/upload", upload.single("file"), async (req, res) => {
    try {
        const filePath = req.file.path;

        const uploadResponce = await imagekit.upload({
            file: fs.readFileSync(filePath),//read file
            fileName: req.file.originalname,
            folder: "./liteSocial"
        })

        fs.unlinkSync(filePath);//file delete

        return res.json({
            url: uploadResponce
        })
    } catch (error) {
        return responder(res, null, 400, false, `${error.message}`)
    }
})



//general routes
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