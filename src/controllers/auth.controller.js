import prisma from "../config/db.js";
import { generateAccessToken } from "../utils/accessToken.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


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


const login = asyncHandler(async (req, res)=>{
    const {email, password} = req.body
    
    if(!email && !password){
        throw new ApiError(400, "Email and password are required")
    }

    const user = await prisma.user.findUnique({
        where:{email:email}
    })
    if(!user){
        throw new ApiError(400, "User does not exist")
    }

    const isPasswordValid =  user.password === String(password) ? true : false
    if(!isPasswordValid){
        throw new ApiError(400, "Incorrect password")
    }

    const accessToken = generateAccessToken(user)

    const options =  {
        httpOnly:true,
        secure:true
    }

    return res
    .status(200)
    .cookie('accessToken',accessToken,options)
    .json(
        new ApiResponse(
            200,
            user,
            "Logged in successfully !!!!!!"
        )
    )


})


export {
    registerUser,
    login
}