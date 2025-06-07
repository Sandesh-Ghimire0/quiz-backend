import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import passport from './middlewares/googleAuth.middleware.js'

export const app = express()

app.use(cors())
app.use(express.json({limit:'16kb'})) 
app.use(express.urlencoded({extended:true}))
app.use(express.static('public')) 
app.use(cookieParser())
app.use(passport.initialize())



//-----------------------------------------------------------------------


import { userRouter } from './routes/user.route.js'
import { googleRouter } from './routes/google.route.js'

app.use('/api/user',userRouter)
app.use('/auth',googleRouter)