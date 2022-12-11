import express from 'express'
import { createCourses, getAllCourses, getCoursesById, updateCourse, deleteCourse} from '../controller/courseController.js'





const router = express.Router()


router.get('/get-courses', getAllCourses)
router.get('/get-courses/:id', getCoursesById)




router.post('/create', createCourses)
router.put('/update/:id', updateCourse)
router.delete('/delete/:id', deleteCourse)
export default router