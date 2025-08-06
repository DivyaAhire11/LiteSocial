
const responder = (res , data = null , status = 200 , success = true , message = "default message")=>{
 
    return res.status(status).json({
        data,
        success,
        message
    })
}

export default responder