import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import prisma from "../config/db.js";


const createQuestion = asyncHandler( async (req, res ) =>{
    const {questions} = req.body
    const admin_id = req.user.id

    console.log(questions)

    if(!questions){
        throw new ApiError(400, "Questions can't be empty")
    }

    if(!admin_id){
        throw new ApiError(400, "Admin Id not availabe")
    }

    let isCreated = false
    for( const q of questions){
        await prisma.question.create({
            data: {
                ...q,
                user: {
                    connect: { id: admin_id}
                },
            },
            include:{
                options:true
            }
        })
    }
    isCreated = true
    
    if(!isCreated){
        throw new ApiError(400, "Error while inserting data into the database")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            [],
            "Questions created/inserted in the Database successfully  !!!!!"
        )
    )

})


const getCreatedQuestions = asyncHandler( async (req, res)=>{
    const admin_id = req.user.id
    if(!admin_id){
        throw new ApiError(400, "Admin id is required")
    }

    const questions = await prisma.question.findMany({
        where:{
            userId:admin_id
        },
        include: {
            options: true
        }
    })
    console.log(questions)

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            questions,
            "Question retrieved successfully !!!!!"
        )
    )


})


export {
    createQuestion,
    getCreatedQuestions
}