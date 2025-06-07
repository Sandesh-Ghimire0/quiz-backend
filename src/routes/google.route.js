import { Router } from "express";
import passport from '../middlewares/googleAuth.middleware.js'
import { ApiResponse } from "../utils/apiResponse.js";

export const googleRouter = Router()


// Start Google OAuth
googleRouter.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);


// Handle Google OAuth callback
googleRouter.get(
    '/google/callback',
    passport.authenticate('google', {session:false}),
    async (req,  res)=>{
        const {token, user} = req.user

        // saving the token in the cookie
        const options = {
            httpOnly:true,
        }

        return res
        .cookie('accessToken',token, options)
        .redirect('http://localhost:5173/home');
    }

)