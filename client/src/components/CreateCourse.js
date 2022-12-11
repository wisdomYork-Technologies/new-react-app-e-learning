import React from 'react'
import coursesStore from '../stores/courseStore'

const CreateCourse = () => {

const store = coursesStore()
    if(store.updateForm._id) return <></>
        return (
            <div>
            <h2>Create Course</h2>
            <form onSubmit={store.createCourse}>
                <label>Image url</label>
            <input onChange={store.getInput} value={store.createForm.image} name="image" placeholder="Enter your image url"/>
            <label>Course Title</label>
                <input onChange={store.getInput} value={store.createForm.title} name="title" placeholder="Course title"/>
                <label>Description</label>
                <textarea onChange={store.getInput} value={store.createForm.description} name="description" placeholder="course description"/> 
                <label>Price</label>
                <input onChange={store.getInput} value={store.createForm.price} name="price"/>
                <button type="submit">Create Course</button>
            </form>
            </div>
    )}

export default CreateCourse
