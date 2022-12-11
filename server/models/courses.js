import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
     description: {type:String, required: true},
     image:{type:String, required: true},
     price: {type: Number, required:true},
     title: {type:String, required: true}
})



const Course = mongoose.model("Course", courseSchema)

export default Course