import mongoose from "mongoose";
import responder from "../Utils/respond.js";


const connectdb = async (req, res) => {
    try {

        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database connect successfully")

    } catch (error) {
        responder(res, [], 400, false, error.message)
    }
}
export default connectdb