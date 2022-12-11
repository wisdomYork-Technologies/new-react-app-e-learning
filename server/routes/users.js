import express from 'express'
// import { getAllUsers } from '../controller/controller'
import {checkAuth, login, logout, registerUser} from '../controller/usersController.js'
import {auth} from '../middleware/auth.js'


const router = express.Router()


// router.get('/', getAllUsers)
router.post('/register', registerUser)

router.get('/check-auth', auth, checkAuth)


router.post('/login', login)
router.get('/logout', logout)

export default router