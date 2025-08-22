import responder from "../Utils/respond.js"
import uploadToImgkit from "../Utils/UploadToIMGKIT.js"
//by default package install in nodejs => import fs from "fs"

const uploadProfile = async (req, res) => {
    try {
    
        if (!req.file) {
            return responder(res, null, 400, false, "file not found")
        }
           let uploadInfo = await uploadToImgkit(req.file);

          return responder(res, uploadInfo, 200, true, "File uploaded successfully");
        

      
   
    } catch (error) {
        console.log(error.message)
        return responder(res, [], 400, false, error.message);
    }
}

export { uploadProfile }