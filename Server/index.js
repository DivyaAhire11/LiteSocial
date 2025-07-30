import express from "express"

const app = express()
const PORT = 3000 || process.env.PORT

//my utils
import responder from "./Utils/respond.js"

app.get("/",(req,res)=>{
    return responder(res,null,200,true,"success")
})

app.get("/health",(req,res)=>{
    responder(res,null,200,true,"server is running healthy")
})

app.listen(PORT ,()=>{
    console.log(`Server run on port ${PORT}`)
})