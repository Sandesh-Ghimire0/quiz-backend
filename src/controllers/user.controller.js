import prisma from "../config/db.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const fetchQuestions = asyncHandler( async (req, res )=>{
    const {noOfQuestions} = req.query
    console.log(req.query)

    if(!noOfQuestions){
        throw new ApiError(400, "No of question is required")
    }


    const total = await prisma.question.count()
    console.log(total)
    const skip = Math.floor(Math.random() * (total - Number(noOfQuestions)));

    const questions = await prisma.question.findMany({
        skip:skip,
        take:Number(noOfQuestions)
    })

    if(!questions){
        throw new ApiError(400, "Failed to fetch the question")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            questions,
            "Question fetched successfully !!!"
        )
    )

})

export {
    fetchQuestions
}
