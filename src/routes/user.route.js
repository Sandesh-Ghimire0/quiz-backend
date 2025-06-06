import { Router } from "express";
import { login, registerUser } from "../controllers/auth.controller.js";

export const userRouter = Router()

userRouter.route('/signup').post(registerUser)
userRouter.route('/login').post(login)
