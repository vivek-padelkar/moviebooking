import asyncHandler from 'express-async-handler'
import {
  signUpValidtor,
  signinValidtor,
} from '../validation/user.validation.js'
import generateToken from '../utils/generateToken.js'
import axios from 'axios'
import { getDecryptedDate } from '../utils/enc.js'

export const userSignup = asyncHandler(async (req, res) => {
  const decryptedData = JSON.parse(getDecryptedDate(req.body.data))
  const validation = signUpValidtor.validate(decryptedData)
  if (!validation.error) {
    const { email } = validation.value
    const isUserExsist = await userExsist(email)
    if (!isUserExsist.length) {
      const { data } = await axios.post(
        `${process.env.DBBASEURL}user`,
        decryptedData
      )
      res.json({
        message: 'User created successfully',
        data: {
          email,
          token: generateToken(data.id),
        },
      })
    } else {
      res.status(200).json({
        message: 'User already exist',
      })
    }
  } else {
    res.status(400)
    throw new Error(validation.error.details[0].message)
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

export const userUpdate = asyncHandler(async (req, res) => {
  // const decryptedData = JSON.parse(getDecryptedDate(req.body.data))
  // const validation = signinValidtor.validate(decryptedData)
  // if (!validation.error) {
  const { email, password } = req.body
  //   const { data } = await axios.get(
  //     `${process.env.DBBASEURL}user?email=${email}&password=${password}`
  //   )
  const a = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const { data } = await axios.put(
    `${process.env.DBBASEURL}user?email=${email}&password=${password}`,
    { password: 'lihi' },
    a
  )
  res.json({
    message: `done`,
  })
  //   } else {
  //     res.status(401).json({
  //       message: 'Invalid email/password,please re-enter',
  //     })
  //   }
  // } else {
  //   res.status(400)
  //   throw new Error(validation.error.details[0].message)
})

const userExsist = asyncHandler(async (email) => {
  const { data } = await axios.get(
    `${process.env.DBBASEURL}user?email=${email}`
  )
  return data
})
