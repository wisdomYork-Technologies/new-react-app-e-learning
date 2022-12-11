import express from 'express'
import logger from 'morgan'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import indexRoute from './routes/indexRoute.js'
import usersRoute from './routes/users.js'
import courseRoute from './routes/courses.js'


dotenv.config()

const app = express()

app.use(express.json())
app.use(logger('dev'))
app.use(cookieParser()) //helps us read or parse cookies
//Cors lets you accept request from any domain
//since we are working on a react app on a different domain, we set origin and credentials to true
app.use(cors({
    origin: true,
    credentials: true
}))

app.use('/', indexRoute)
app.use('/users', usersRoute)
app.use('/courses', courseRoute)


mongoose.connect(process.env.DB_CONNECTION, ()=>{
    console.log('Database connected successfully')
})


app.listen(process.env.PORT, ()=>{
    console.log(`Server is listening on http://localhost:${process.env.PORT}`)
})