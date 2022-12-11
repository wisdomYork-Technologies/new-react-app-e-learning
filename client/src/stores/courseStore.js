//This file will handle all our states and functions to update the states

import create from 'zustand'
import axios from 'axios'

const coursesStore = create((set)=>({
    courses: null,
    createForm:{
      _id:"", title:"", description:"", price:"", image:""
    },
    updateForm:{
      _id:"", title:"", description:"", price:"", image:""
    },

    fetchCourses: async() => {
        //fetch the courses
        const response = await axios.get('http://localhost:3333/courses/get-courses')
        // Set to state
        set({courses: response.data.courses})
        //setCourses() //This takes care of changes in the state
      },
      getInput: (e) => {
        const {name, value} = e.target
        //For existing state, we use this syntax
        set((state)=>{
            return {
              createForm:{
                ...state.createForm,
                [name]:value
              }
            }
        })
        
        // setCreateForm({
          
        // })
        // return 
      },
      createCourse: async (e) => {
        e.preventDefault()
        //Create the courses
        //To target an existing state, we use this syntax
        const {createForm, courses} = coursesStore.getState()

        const response = await axios.post("http://localhost:3333/courses/create", createForm)
        //update state with the courses that has just been added
        
        set({
          courses: [...courses, response.data.course],
          createForm:{image: "", title:"", description:"",price:""}
        })
      },
      deleteCourse: async(_id) => {
        //Delete the course
        const response = await axios.delete(`http://localhost:3333/courses/delete/${_id}`)
        
        const {courses} = coursesStore.getState()

        const remainingCourses = courses.filter((course)=>{
          return course._id !== _id
        })
        //Update state
        set({courses: remainingCourses})
        // setCourses(response.data.remainingCourses)
      },
      handleFieldChange: (e) => {
        //Destructure the value and name coming from e.target
        const {value, name} = e.target
          //Update state
          set((state)=>{
            return{
              updateForm: {
                ...state.updateForm,
                [name]:value
              }
            }
          })
      },
      toggleUpdate: (course) => {
        //Edit the Course
        const {image, title, description, price, _id} = course
        set({
          updateForm:{
            image, title, description, price, _id
          }
        })
      },
      handleEditedForm: async(e) => {
        e.preventDefault()
        //Getting previously declared state
        const {updateForm, courses} = coursesStore.getState()
        //Collecting the payload from the form and sending to the server
        const {image, title, description, price, _id} = updateForm
        //Send the update request
        const response = await axios.put(`http://localhost:3333/courses/update/${_id}`, {image, title, description, price})
        //Update State
        const newCourses = [...courses]
        const courseIndex = courses.findIndex((course)=>{
          return course._id === _id
        })
        newCourses[courseIndex] = response.data.updatedCourse
        //Update state for the courses that are displaying
        set({
          courses: newCourses,
          updateForm: {image:"", title:"", description:"", price:"", _id:""}
        })
      },
}))

export default coursesStore


 