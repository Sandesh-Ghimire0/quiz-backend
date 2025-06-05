
import jwt from 'jsonwebtoken'

export const generateAccessToken = (user) =>{
    return jwt.sign(
        {
            _id:this._id,
            email:user.email,
            role:user.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

