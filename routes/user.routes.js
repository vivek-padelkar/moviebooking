import express from 'express'
const router = express.Router()
import {
  userSignup,
  userSignin,
  userUpdate,
} from '../controller/user.controller.js'
import { protect } from '../middleware/auth.middleware.js'

router.route('/signup').post(userSignup)
router.route('/signin').post(protect, userSignin)
router.route('/update').put(userUpdate)
export default router
