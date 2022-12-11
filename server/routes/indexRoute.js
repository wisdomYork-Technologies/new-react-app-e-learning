import express from 'express'
import { home } from '../controller/controller.js'


const router = express.Router()


router.get('/', home)

export default router