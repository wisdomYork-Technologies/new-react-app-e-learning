import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/users.js'
dotenv.config()


export const auth = async(req, res, next) => {
    try {
        console.log("In middleware")
        //Read token off cookies
        const token = req.cookies.Authorization
        
        if(!token){
            return res.status(401).json({
                Error: "Unauthorized"
            })
        }
        //Decode token
        const verfiyToken = jwt.verify(token, process.env.APP_SECRET)

        if(!verfiyToken){
            return res.status(400).json({
                Error: "Kindly login"
            })
        }

        //Check if expired
        if(Date.now() > verfiyToken.expiry) {
            return res.status(400).json({
                Error: "Kindly login"
            })
        }
        const {_id} = verfiyToken
        //Find user with the decoded token
        const verified = await User.findById(_id)
        //Attach user to request
        req.user = verified
        //Continue
        next()
    } catch(error){
        return res.status(500).json({
            Error: "Internal server error /auth", error
        })
    }
}