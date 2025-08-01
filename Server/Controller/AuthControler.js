import responder from "../Utils/respond.js"
import User from "../Models/user.model.js"
import bcrypt from "bcrypt"

const signup = async(req,res)=>{
       try {
        let {name ,email , password} = req.body
        let info = ["name","email","password"]
         
        info.forEach((ele)=>{
            if(!(req.body[ele])){
                responder(null,[],400,false,`${ele} field is required`)
            }
        })
        
        //check is user already exist
        let IsuserExist = await User.findOne({email})
        if(!IsuserExist){
            responder(res,null,400,false,"email already exist")
        }

        // if not exist              
        const hasPassword = await bcrypt.hash(password,10)

        const createuser = await User.create({
            name,
            email,
            password : hasPassword
        })

        if(createuser){
            created = await createuser.save();
            return responder(res,null,200,true,"User create successfully")
        }
        
       } catch (error) {
        
       }
}

export {signup}