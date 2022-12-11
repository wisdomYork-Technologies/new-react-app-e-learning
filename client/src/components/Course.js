import React from 'react'
import coursesStore from '../stores/courseStore'

const Course = ({ course }) => {
    // const store = coursesStore()
    // const course = coursesStore.getState("course")
    const store = coursesStore(
        (store) => {
            return { deleteCourse: store.deleteCourse,
                toggleUpdate: store.toggleUpdate
            }
    })
  return (
      <div key={course._id}>
                    <p>Course title: {course.title}</p>
                    <p>Course description: {course.description}</p>
                    <p>Course Price: {course.price}</p>
                    <img src={course.image} alt="dbImage"></img>
                    <button onClick={()=>store.deleteCourse(course._id)}>Delete</button>
                    <button onClick={()=>store.toggleUpdate(course)}>Edit</button>
                </div>
  )
}

export default Course
