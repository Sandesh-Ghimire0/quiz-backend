import { Router } from "express";
import { getCurrentUser, login, logout, registerUser } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/jwtAuth.middleware.js";
import { fetchQuestions } from "../controllers/user.controller.js";



export const userRouter = Router()

userRouter.route('/me').get(verifyJWT, getCurrentUser)
userRouter.route('/signup').post(registerUser)
userRouter.route('/login').post(login)
userRouter.route('/logout').post(verifyJWT, logout)

userRouter.route('/fetch-questions').get(verifyJWT, fetchQuestions)
