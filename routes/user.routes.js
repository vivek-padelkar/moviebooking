import express from 'express'
const router = express.Router()
import { userSignup, userSignin } from '../controller/user.controller.js'

router.route('/signup').post(userSignup)
router.route('/signin').post(userSignin)
export default router
