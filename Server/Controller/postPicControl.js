import responder from "../Utils/respond.js"
import ImageKitConfig from "../Config/ImageKitConfig.js"
//by default package install in nodejs => import fs from "fs"

const  uploadProfile = async(req , res)=>{
    try {
        if(!req.file){
            return responder(res,null,400,false,"file not found")
        } //upload on imageKit

            let imagekit = ImageKitConfig(); //function which create instance
           
            let uploadInfo = await imagekit.upload({
                file : fs.readFileSync(req.file.path),
               fileName : req.file.originalname,
               folder:"./liteSocial"
        })
     console.log(uploadInfo)
    } catch (error) {
        
    }
}

export { uploadProfile}