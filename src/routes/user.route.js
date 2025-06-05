import { Router } from "express";
import { registerUser } from "../controllers/auth.controller.js";

export const userRouter = Router()

userRouter.route('/signup').post(registerUser)
