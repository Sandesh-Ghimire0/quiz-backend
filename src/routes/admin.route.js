import { Router } from "express";
import { verifyJWT } from "../middlewares/jwtAuth.middleware.js";
import { createQuestion, getCreatedQuestions } from "../controllers/admin.controller.js";

export const adminRouter = Router()

adminRouter.route('/create-questions').post(verifyJWT, createQuestion)
adminRouter.route('/get-created-questions').get(verifyJWT, getCreatedQuestions)