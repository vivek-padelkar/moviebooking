import express from 'express'
const router = express.Router()
import { getMovies } from '../controller/movie.controller.js'

router.route('/').get(getMovies)

export default router
