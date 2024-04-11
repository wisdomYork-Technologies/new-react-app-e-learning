import coursesStore from "../stores/courseStore";
import Course from "./Course";

export default function Courses(){
    const store = coursesStore()

    return (
        <div>
            <div>Newly</div>
        <h1>Courses:</h1>
            { store.courses && store.courses.map((course)=>{
            return  <Course course = {course} key={course._id}/>
            })
        }
        </div>
    )
}