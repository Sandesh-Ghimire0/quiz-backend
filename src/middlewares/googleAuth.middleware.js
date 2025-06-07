import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import prisma from '../config/db.js'
import { generateAccessToken } from "../utils/accessToken.js";


passport.use(
    new GoogleStrategy(
        {
            clientID:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
            callbackURL:process.env.GOOGLE_CALLBACK_URL
        },
        async (accessToken, refreshToken, profile, done) => {
           try {
                let user =await prisma.user.findUnique({
                    where:{googleId:profile.id}
                })
    
                if(!user){
                    user =await prisma.user.create({
                        data:{
                            googleId:profile.id,
                            name:profile.displayName,
                            email:profile.emails[0]?.value
                        }
                    })
                }

                const accessToken = generateAccessToken(user)
                const createdUser = await prisma.user.findUnique({
                    where:{googleId:profile.id}
                })

                return done(null, {user:createdUser, token:accessToken})
           } catch (error) {
                return done(error, null)
           }
        }
    )
)

export default passport;
