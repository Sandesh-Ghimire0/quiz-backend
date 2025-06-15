import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import prisma from "../config/db.js";


const createQuestion = asyncHandler( async (req, res ) =>{
    const {questions} = req.body
    const admin_id = req.user.id


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


const updateQuestion = asyncHandler( async (req, res)=>{
    const {question} = req.body

    if(!question){
        throw new ApiError(500, "Question not availabe to update")
    }

    /*  
        - deleting all the options at first so that duplicate option are not created (create command is being used in update)
        - explicitly needs to mention the fields that needs update
    
    */
    await prisma.questionOption.deleteMany({
    where: { questionId: question.id },
    });

    const updatedQuestion = await prisma.question.update({
    where: { id: question.id },
    data: {
        title: question.title,
        answer: question.answer,
        options: {
        create: question.options.map(opt => ({
            text: opt.text,
        })),
        },
    },
    include: {
        options: true,
    },
    });


    if(!updatedQuestion){
        throw new ApiError(200, "Failed to update the Question")
    }


    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            updatedQuestion,
            "Question updated successfully !!!!!"
        )
    )
})

const deleteQuestion = asyncHandler( async (req, res)=>{
    const {questionId} = req.body

    if(!questionId){
        throw new ApiError(400, "Question Id not availble")
    }

    let isDeleted = false
    // deleting the options at first so there is no any foreign key constraints
    await prisma.questionOption.deleteMany({
        where:{questionId:questionId}
    })
    await prisma.question.delete({
        where:{id : questionId},
    })

    isDeleted = true

    if(!isDeleted){
        throw new ApiError(400, "Question Deletion failed")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            [],
            "Question Deleted successfully"
        )
    )

})


const getAllUsers = asyncHandler( async (req, res)=>{
    const users =await prisma.user.findMany()

    if(!users){
        throw new ApiError(500, "Unable to get all users data")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            users,
            "ALL users data fetched successfullly"
        )
    )
})


const deleteUser = asyncHandler( async (req, res)=>{
    const userId = req.params.id

    if(!userId){
        throw new ApiError(400, "UserId not provided")
    }

    let success =false
    await prisma.user.delete({
        where:{id:userId}
    })
    success=true

    if(!success){
        throw new ApiError(400, "Failed to delete the user")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            [],
            "User deleted successfully !!!!"
        )
    )

})


export {
    createQuestion,
    getCreatedQuestions,
    updateQuestion,
    deleteQuestion,
    getAllUsers,
    deleteUser
}