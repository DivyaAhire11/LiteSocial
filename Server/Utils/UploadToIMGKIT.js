import ImageKitConfig from "../Config/ImageKitConfig.js"
import responder from "./respond.js";
import fs from "fs";


const uploadToImgkit = async (file) => {
    try {

        let imagekit = ImageKitConfig(); //function which create instance


        let uploadInfo = await imagekit.upload({
            file: fs.readFileSync(file.path),
            fileName: file.originalname,
            folder: "/liteSocial",

        })
        //delete local file after upload
        fs.unlinkSync(file.path);
         return uploadInfo;

    } catch (error) {
         return responder;
    }
}


export default uploadToImgkit