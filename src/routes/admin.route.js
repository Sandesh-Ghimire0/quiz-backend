import { Router } from "express";
import { verifyJWT } from "../middlewares/jwtAuth.middleware.js";
import { createQuestion, deleteQuestion, getCreatedQuestions, updateQuestion } from "../controllers/admin.controller.js";

export const adminRouter = Router()

adminRouter.route('/create-questions').post(verifyJWT, createQuestion)
adminRouter.route('/get-created-questions').get(verifyJWT, getCreatedQuestions)
adminRouter.route('/update-question').put(verifyJWT, updateQuestion)
adminRouter.route('/delete-question').post(verifyJWT, deleteQuestion)