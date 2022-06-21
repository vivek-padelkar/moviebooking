import express from 'express'
const router = express.Router()
import { getEncdata } from '../controller/enc.controller.js'

router.route('/getdata').post(getEncdata)

export default router
