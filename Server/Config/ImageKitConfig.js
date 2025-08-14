
const imageKitConfig=()=>{
       try {
        
        let imagekit = new imagekit({
            publicKey : `${process.env.IMAGEKIT_PUBLIC_KEY}`,
            privateKey : `${process.env.IMAGEKIT_PRIVATE_KEY}`,
            urlEndpoint : "https://ik.imagekit.io/liteSocial"
        })
        return imagekit

       } catch (error) {
           console.log(error.message)
       }
}

export default imageKitConfig