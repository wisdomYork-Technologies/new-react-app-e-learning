import React from 'react'
import coursesStore from '../stores/courseStore'

const UpdateCourse = () => {

const store = coursesStore()
if(!store.updateForm._id) return <></>


  return (
    <div>
      <h2>Edit Course</h2>
      <form onSubmit={store.handleEditedForm}>
      {/* <label>Id</label>
      <input  onChange={handleFieldChange} value={updateForm._id} name="_id"/> */}
        <label>Image url</label>
      <input onChange={store.handleFieldChange} value={store.updateForm.image} name="image" placeholder="Enter your image url"/>
      <label>Course Title</label>
        <input onChange={store.handleFieldChange} value={store.updateForm.title} name="title" placeholder="Course title"/>
        <label>Description</label>
        <textarea onChange={store.handleFieldChange} value={store.updateForm.description} name="description" placeholder="course description"/> 
        <label>Price</label>
        <input onChange={store.handleFieldChange} value={store.updateForm.price} name="price"/>
        <button type="submit">Update Course</button>
      </form>
      </div>
  )}

export default UpdateCourse
