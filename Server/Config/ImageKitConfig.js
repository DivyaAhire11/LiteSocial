import Imagekit from "imagekit"
import responder from "../Utils/respond.js"

const ImageKitConfig = () => {
    try {

        return new Imagekit({
            publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
            urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
        })
        
    } catch (error) {
        console.log(error.message)
        return responder(responder,[],400,false,`${error.message}`)
    }
}

export default ImageKitConfig