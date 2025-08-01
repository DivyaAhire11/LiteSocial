import { Schema,model } from "mongoose";

const userSchema = new Schema({
     Username : {
        type : String,
        required : true
     },
     Email :{
        type : String,
        required :true
     },
     Password :{
        type : String,
        required : true
     }
})

const User = model("User",userSchema)
export default User