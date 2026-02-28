import jwt from 'jsonwebtoken'
// Middleware funciton to decode jwto token to get clerkID

const authuser=async(req,res,next)=>{
    try {
        const {token}=req.headers
        if(!token){
            return res.json({success:false,message:'not authorized login again'})
        }
const token_decode=jwt.decode(token)
req.body.clerkId=token_decode.clerkId
next()        
    } catch (error) {
        
    }
}
export default authuser