import imagekit from "imagekit"

const ImageKitConfig=()=>{
       try {
        
        let IMGKit = new imagekit({
            publicKey : `${process.env.IMAGEKIT_PUBLIC_KEY}`,
            privateKey : `${process.env.IMAGEKIT_PRIVATE_KEY}`,
            urlEndpoint : "https://ik.imagekit.io/liteSocial"
        })
        return IMGKit

       } catch (error) {
           console.log(error.message)
       }
}

export default ImageKitConfig