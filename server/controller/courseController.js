import Course from '../models/courses.js'
import User from '../models/users.js'

export const createCourses = async(req,res) => {
   try {
    const userId = req.params
    const {description, image, price, title} = req.body;
    //return the users details
    const user = await User.find({userId})

    const course = await Course.create({
        title,
        image,
        price,
        description
    })
    return res.status(200).json({
        message:"Course successfully created",
        course
    })
   } catch (error) {
        return res.status(500).json({
            Error: "Internal server error /create"
        })
   }
   
}

export const getAllCourses = async(req,res) => {
    try {
        const courses = await Course.find({})
        return res.status(200).json({
            message: "Successfully fetched courses",
            courses
        })
    } catch (error) {
        return res.status(500).json({
            Error: "Internal server error /getcourses"
        })
    }
}
export const getCoursesById = async(req,res) => {
    try {
        const id = req.params.id
        const course = await Course.findById(id)
        return res.status(200).json({
            message: "Successfully fetched course",
            course
        })
    } catch (error) {
        return res.status(500).json({
            Error: "Internal server error /getcourses"
        })
    }
}
export const updateCourse = async(req,res) => {
    try {
        const id = req.params.id
        const { description,image,price,title} = req.body
        const course = await Course.findByIdAndUpdate(id, {
            title,
            image,
            price,
            description
        })
        const updatedCourse = await Course.findById(id)
    return res.status(200).json({
        message:"Course successfully updated",
        updatedCourse
    })
    } catch (error) {
        return res.status(500).json({
            Error: "Internal server error /update-course"
        })
    }
}
export const deleteCourse = async(req,res) => {
    try {
        const id = req.params.id
        const course = await Course.findByIdAndDelete(id)
        return res.status(200).json({
            message: "Successfully deleted course",
            deletedCourse:course
        })
    } catch (error) {
        return res.status(500).json({
            Error: "Internal server error /delete-courses"
        })
    }
}