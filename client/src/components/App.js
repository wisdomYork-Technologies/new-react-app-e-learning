import { useEffect} from "react";
// import axios from 'axios'
import coursesStore from "../stores/courseStore";
import Courses from "./Courses"
import CreateCourse from "./CreateCourse";
import UpdateCourse from "./UpdateCourse";


function App() {
  const store = coursesStore()
  //States
  // const [courses, setCourses] = useState(null)
  // const [createForm, setCreateForm] = useState({_id:"",image: "", title:"", description:"",price:"" })
  // const [messages, setMessage] = useState(null)
  // const [updateForm, setUpdateForm] = useState(
  //   {_id:"", image:"", title:"", description:"",price:"" }
  // )
  //Use Effect
  useEffect(()=>{
    store.fetchCourses()
  }, [])
  // useEffect(()=>{
  //   console.log(`${updateForm} is updateForm State`)
  // })
  //Functions
  // const fetchCourses = async() => {
  //   //fetch the courses
  //   const response = await axios.get('http://localhost:3333/courses/get-courses')
  //   // Set to state
  //   setCourses(response.data.courses) //This takes care of changes in the state
  // }
  // const getInput = (e) => {
  //   const {name, value} = e.target
  //   // console.log(name, value)
  //   // setCreateForm()
  //   //Here, we are updating the name field that will be retrieved after submitting the form
  //   setCreateForm({
  //     ...createForm,
  //     [name]:value
  //   })
  //   // return 
  // }
  // const createCourse = async (e) => {
  //   e.preventDefault()
  //   //Create the courses
  //   const response = await axios.post("http://localhost:3333/courses/create", createForm)
  //   //update state with the courses that has just been added
  //   setCourses([...courses, response.data.course])
  //   // setMessage(response.data)
  //   console.log(response.data.message)
  //   setMessage(response.data.message)
  //   //clear form state
  //   setCreateForm({image: "", title:"", description:"",price:""})
  // }
  // const deleteCourse = async(_id) => {
  //   //Delete the course
  //   const response = await axios.delete(`http://localhost:3333/courses/delete/${_id}`)
  //   console.log(response)
    
  //   const remainingCourses = [...courses].filter((course)=>{
  //     return course._id !== _id
  //   })
  //   //Update state
  //   setCourses(remainingCourses)
  //   // setCourses(response.data.remainingCourses)
  // }
  // const handleFieldChange = (e) => {
  //   //Destructure the value and name coming from e.target
  //   const {value, name} = e.target
  //     //Update state
  //     setUpdateForm({
  //       ...updateForm,
  //       [name]:value
  //     })
  // }
  // const toggleUpdate = (course) => {
  //   //Edit the Course
  //  setUpdateForm({
  //   image:course.image,
  //   title:course.title,
  //   description:course.description,
  //   price:course.price,
  //   _id:course._id
  //  })
  // }
  // const handleEditedForm = async(e) => {
  //   e.preventDefault()
  //   //Collecting the payload from the form and sending to the server
  //   const {image, title, description, price} = updateForm
  //   //Send the update request
  //   const response = await axios.put(`http://localhost:3333/courses/update/${updateForm._id}`, {image, title, description, price})
  //   //Update State
  //   const newCourses = [...courses]
  //   const courseIndex = courses.findIndex((course)=>{
  //     return course._id === updateForm._id
  //   })
  //   newCourses[courseIndex] = response.data.updatedCourse
  //   //Update state for the courses that are displaying
  //   setCourses(newCourses)
  //   //Clear update form state
  //   setUpdateForm(
  //     {image:"", title:"", description:"",price:"" }
  //   )
    
  // }

  return (
    <div className="App">
     <Courses />
      <UpdateCourse />
        <CreateCourse />
    </div>
  );
}

export default App;
