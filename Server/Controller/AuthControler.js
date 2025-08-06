import responder from "../Utils/respond.js"
import User from "../Models/user.model.js"
import bcrypt from "bcrypt"

const signup = async (req, res) => {
    try { 
        console.log(req.body)
        
        const { name, email, password } = req.body
       
        const requiredinfo = ["name", "email", "password"]

        requiredinfo.forEach((ele) => {
            if (!(req.body[ele])) {
                responder(null, [], 400, false, `${ele} field is required`)
            }
        })
      
        //check is user already exist
        let IsUserExist = await User.findOne({ email })
         if (IsUserExist) {
            responder(res, null, 400, false, "email already exist")
        }
        // if not exist              
        const hashPassword = await bcrypt.hash(password, 10)

        const createUser = await User.create({
           Username : name,
           Email: email,
           Password: hashPassword
        })

        if (createUser) {
            await createUser.save();
            return responder(res, createUser, 200, true, "User create successfully")
        }

    } catch (error) {
        responder(res, [], 400, false, error.message)
    }
}

export { signup }