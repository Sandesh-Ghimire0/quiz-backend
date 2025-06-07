import { Router } from "express";
import { getCurrentUser, login, registerUser } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/jwtAuth.middleware.js";



export const userRouter = Router()

userRouter.route('/me').get(verifyJWT, getCurrentUser)
userRouter.route('/signup').post(registerUser)
userRouter.route('/login').post(login)
