import asyncHandler from 'express-async-handler'
import {
  signUpValidtor,
  signinValidtor,
} from '../validation/user.validation.js'
import generateToken from '../utils/generateToken.js'
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
      message: `oops ! Data not found, please cahnge your movie preference`,
    })
  }
})

export const userSignin = asyncHandler(async (req, res) => {
  const decryptedData = JSON.parse(getDecryptedDate(req.body.data))
  const validation = signinValidtor.validate(decryptedData)
  if (!validation.error) {
    const { email, password } = validation.value
    const { data } = await axios.get(
      `${process.env.DBBASEURL}user?email=${email}&password=${password}`
    )
    if (data.length) {
      res.json({
        message: `Login succefully, Welcome back ${req.user.name}`,
        token: generateToken(req.user.id),
      })
    } else {
      res.status(401).json({
        message: 'Invalid email/password,please re-enter',
      })
    }
  } else {
    res.status(400)
    throw new Error(validation.error.details[0].message)
  }
})
