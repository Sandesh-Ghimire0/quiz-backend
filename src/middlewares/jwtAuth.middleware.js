import jwt from 'jsonwebtoken'
import { ApiError } from '../utils/apiError.js'
import prisma from '../config/db.js'


export const verifyJWT = async (req, res, next )=>{
    try {
        const token  = req.cookies?.accessToken
    
        if(!token){
            throw new ApiError(401, "unauthorized access")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await prisma.user.findUnique({
            where:{id:decodedToken.id}
        })
    
        if(!user){
            throw new ApiError(401, "Invalid Token")
        }
    
        req.user = user
        next()
    } catch (err) {
        return res
        .status(403)
        .json({
            error:"Invalid Token"
        })
    }
}