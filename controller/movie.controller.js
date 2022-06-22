import asyncHandler from 'express-async-handler'
import { bookTicketValidtor } from '../validation/user.validation.js'
import axios from 'axios'
import { getDecryptedDate } from '../utils/enc.js'

export const getMovies = asyncHandler(async (req, res) => {
  let url = '?'
  const location = req.query.location
  const movieName = req.query.movieName
  const genre = req.query.genre
  const isShowRunning = req.query.isShowRunning
  const ticketavialable = req.query.ticketavialable

  location ? (url = url + `&location=${location}`) : url
  movieName ? (url = url + `&name=${movieName}`) : url
  genre ? (url = url + `&genre=${genre}`) : url
  isShowRunning ? (url = url + `&isShowRunning=${isShowRunning}`) : url

  url = url !== '?' ? '?' + url.substring(2, url.length) : ''
  const { data } = await axios.get(`${process.env.DBBASEURL}movies${url}`)

  if (data.length) {
    if (ticketavialable & (data[0].ticketavialable > ticketavialable)) {
      res.json({
        message: `oops ! only ${data[0].ticketavialable} ticket's left`,
      })
    } else {
      res.json({
        data,
      })
    }
  } else {
    res.json({
      message: `oops ! Data not found, please change your movie preference`,
    })
  }
})

export const getMovieLocation = asyncHandler(async (req, res) => {
  const { data } = await axios.get(`${process.env.DBBASEURL}movies`)

  if (data.length) {
    let objLocation = ''

    data.map((mData) => (objLocation = objLocation + ',' + mData.location))
    res.json({
      location: [
        ...new Set(objLocation.substring(1, objLocation.length).split(',')),
      ],
    })
  } else {
    res.json({
      message: `oops ! Data not found`,
    })
  }
})

export const bookTicket = asyncHandler(async (req, res) => {
  let url = '?'
  const decryptedData = JSON.parse(getDecryptedDate(req.body.data))
  const validation = bookTicketValidtor.validate(decryptedData)

  if (!validation.error) {
    const { location, movieName, price, noofticket, movieTime, movieDate } =
      validation.value

    location ? (url = url + `&location=${location}`) : url
    movieName ? (url = url + `&name=${movieName}`) : url

    url = url !== '?' ? '?' + url.substring(2, url.length) : ''
    const { data } = await axios.get(`${process.env.DBBASEURL}movies${url}`)

    if (data.length) {
      // check if movie is avialbel with selected movie name,date,location,time
      let showDateExsist = []
      let showTimeExsist = []
      showDateExsist = data[0].showTime.filter(
        (data) => data.date === movieDate
      )

      if (showDateExsist[0]) {
        showTimeExsist = showDateExsist[0].time.filter(
          (mTime) => mTime === movieTime
        )
      }
      if (
        showDateExsist &&
        showDateExsist &&
        data[0].location === location &&
        data[0].name === movieName
      ) {
        if (noofticket > data[0].ticketavialable) {
          res.json({
            message: `oops ! only ${data[0].ticketavialable} ticket's left`,
          })
        } else {
          res.json({
            message: `your ticketTicket booked successfully, thank you visit again`,
            ticketNumber: 'MYMOVIE' + Date.now(),
            location,
            movieTime,
            movieDate,
          })
        }
      }
    } else {
      res.json({
        message: `oops ! Data not found, please change your movie preference`,
      })
    }
  } else {
    res.status(400)
    throw new Error(validation.error.details[0].message)
  }
})
