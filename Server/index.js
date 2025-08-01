import express from "express"

const app = express()
const PORT = 3000 || process.env.PORT

//my utils
import responder from "./Utils/respond.js"
import { signup } from "./Controller/AuthControler.js"

app.post("/api/signup",signup)

app.get("/",(req,res)=>{
    return responder(res,null,200,true,"success")
})

app.get("/health",(req,res)=>{
    responder(res,null,200,true,"server is running healthy")
})

app.listen(PORT ,()=>{
    console.log(`Server run on port ${PORT}`)
})