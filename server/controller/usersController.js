import User from '../models/users.js'
import { validator, loginValidator } from '../utility/validator.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
if(process.env.NODE_ENV !== "production"){
    dotenv.config()
}



export const registerUser = async(req, res) => {
    try {
        
        const { fullname, email, phone, address, password} = req.body
        const validateRequest = await validator.validate(req.body)
        if(validateRequest.error){
            return res.status(400).json({
                Error: validateRequest.error.details[0].message
            })
        }
        //Check if user exists
        const checkDb = await User.findOne({email})
        //If user doesn't exist, then hash password and create user
        
        if(!checkDb){
        
            // Hash password
            const hashed = await bcrypt.hash(password, 10)
            //create the user
            const newUser = await User.create({
                fullname,
                email,
                phone,
                address,
                password: hashed
                })
            const user = await User.findOne({email})
            const _id = user._id.toString()
            
            const expiry = Date.now() + 1000 * 60 * 60 * 24

            const token = jwt.sign({_id, email, expiry}, `${process.env.APP_SECRET}`)
                //Set cookie
                res.cookie("Authorization", token, {
                    expires: new Date(expiry),
                    httpOnly: true,
                    sameSite: "lax",
                    secure: process.env.NODE_ENV === "production"
                })
                return res.status(200).json({
                    message: "User successfully created",
                    newUser,
                    token
                })
            }

            return res.status(400).json({
                Error: "Email already exist, use a different email"
            })
        
    } catch (error) {
        return res.status(500).json({
            Error: "Internal server error, /register-user", error
        })
    }
    
}
export const login = async(req,res) => {
    try{
        const {email, password} = req.body
        const validateEmail = loginValidator.validate(req.body)
        if(validateEmail.error){
            return res.status.json({
                Error: validateEmail.error.details[0].message
            })
        }
        const user = await User.findOne({email})
        console.log("user is ",user)
        if(user){
            const comparePassword = await bcrypt.compare(password, user.password)
            if(comparePassword){
                const _id = user._id.toString()
                //Date.now() means current time, 1000 (milliseconds) stands for 1 second, * 60 means 60 seconds 
                //*60 again means 1 hour * 24 means 1 day
                const expiry = Date.now() + 1000 * 60 * 60 * 24

                const token = jwt.sign({_id, email, expiry}, `${process.env.APP_SECRET}`)
                //Difference between Date.now and new Date is that date.now returns this current time in milliseconds since 1970
                //New Date gives room to input ant time as an argument and it returns the time in the argument in string format
                //Set cookie
                res.cookie("Authorization", token, {
                    expires: new Date(expiry),
                    httpOnly: true,
                    sameSite: "lax",
                    secure: process.env.NODE_ENV === "production"
                })
                //Setting secure to production environment means that on local host, the cookie should still be set likewise on a secured site with https:

                return res.status(200).json({
                    message: "Successfully logged in",
                    token
                })
            }
            return res.status(401).json({
                Error: "Incorrect log in details"
            })
        }
        return res.status(400).json({
            Error: "Kindly signup "
        })
    } catch(error){
        return res.status(500).json({
            Error: "Internal server error", error
        })
    }
}

export const logout = async(req, res) => {
    try{
        // const {_id} = req.user
        // const user = await User.findById(_id)
        //Clear the cookies //We are using the same name we gave to the cookie while setting it
        res.clearCookie("Authorization")
        return res.status(200).json("Deleted")
        // return res.status(200).json({
        //     message: `${user.fullname} You are logged out`
        // })

    }catch(error){
        res.status(500).json({
            Error: "Internal server error /logout", error
        })
    }
}

export const checkAuth = async(req, res) => {
    try{
        res.sendStatus(200)
        console.log("Authenticatd user is ", req.user)
    } catch(error){
        return res.status(500).json({
            Error: "Internal server error /checkAuth"
        })
    }
}