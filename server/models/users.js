import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
    fullname: {type: String},
    email: {type: String, required: true, unique:true, lowercase:true, index:true},
    phone:{type:String, required: true},
    address:{type:String},
    password: {type: String, required:true}
})


const User = mongoose.model("User", userSchema)

export default User

//Unique:true means that there are no repititions of email, all emails must be unique
//lowercase:true, means that all emails that are received are turned to lowercase in our database