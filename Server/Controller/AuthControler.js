import responder from "../Utils/respond.js"
import User from "../Models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

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

const login = async (req, res) => {
    try {
        let { email, password } = req.body
        if (!email || !password) {
            return responder(res, [], 400, false, "email and password required")
        }
        let FindUser = await User.findOne({ email })
        if (!FindUser) {
            return responder(res, null, 400, false, "User Not Found")
        }
        let IsPassMatch = await bcrypt.compare(password, FindUser?.password)
        if (!IsPassMatch) {
            return responder(res, null, 400, false, "Invalid Credentials")
        }

        let token = jwt.sign({
            _id: FindUser._id,
            email: FindUser.email,
            userName: FindUser.userName
        }, process.env.JWT_SECRET)

        req.session.token = token //// storing token on the session

        return responder(res, null, 200, true, "login successfully")


    } catch (error) {
        return responder(res, null, 500, false, `${error.message}`)
    }
}

export { signup, login }