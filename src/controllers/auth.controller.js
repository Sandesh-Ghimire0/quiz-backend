import prisma from "../config/db.js";
import { generateAccessToken } from "../utils/accessToken.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";


const registerUser = async(req, res) =>{
    try {
        const {name, email, password} = req.body
    
        if(!email && !password){
            throw new ApiError(400, "email or password not given")
        }
    
        const existingUser = await prisma.user.findUnique({
            where:{email:email}
        })
        if(existingUser){
            throw new ApiError(400, "Email already exist")
        }
    
        const user = await prisma.user.create({
            data:{
                name,
                email,
                password:String(password)
            }
        })
    
        const createdUser = await prisma.user.findUnique({
            where:{id:user.id}
        })
    
        if(!createdUser){
            throw new ApiError(400, "Something went wrong while creating the new user")
        }
    
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                createdUser,
                "User created Successfully"
            )
        )
    } catch (error) {
        console.log("Register User Error : ",error.message)
    }
}


export {
    registerUser
}