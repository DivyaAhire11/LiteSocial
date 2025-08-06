import responder from "../Utils/respond.js"
import User from "../Models/user.model.js"
import bcrypt from "bcrypt"

const signup = async (req, res) => {
    try {
       

        let { name, email, password, userName } = req.body

        const requiredinfo = ["name", "email", "password", "userName"]

        requiredinfo.forEach((ele) => {
            if (!(req.body[ele])) {
                responder(null, [], 400, false, `${ele} is required`)
            }
        })
         
        //check is user already exist
        let IsUserExist = await User.findOne({ email })
        if (IsUserExist) {
            responder(res, null, 400, false, "email already exist")
        }

        let userNameExist = await User.findOne({ userName })

        if (userNameExist) {
            return responder(res, null, 400, false, "user name already taken");
        }
        // if not exist              
        const hashPassword = await bcrypt.hash(password, 10)

        const createUser = await User.create({
            name,
            email,
            password: hashPassword,
            userName
        })
        await createUser.save();

        if (!createUser) {
            return responder(res, [], 400, false, "Someting went wrong")
        } else {
            return responder(res, createUser, 200, true, "User create successfully")
        }

    } catch (error) {
        responder(res, [], 400, false, error.message)
    }
}

export { signup }