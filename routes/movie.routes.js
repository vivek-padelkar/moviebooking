import express from 'express'
const router = express.Router()
import {
  getMovies,
  getMovieLocation,
  bookTicket,
} from '../controller/movie.controller.js'
import { protect } from '../middleware/auth.middleware.js'

//get movies by :
// location,
// movieName,
// genre,
// isShowRunning,
// ticketavialable,
router.route('/').get(getMovies)

//get all movies location
router.route('/getlocation').get(getMovieLocation)

//book movie ticket
router.route('/bookticket').post(protect, bookTicket)

export default router
