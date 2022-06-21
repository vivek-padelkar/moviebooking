import jwt from 'jsonwebtoken'
// import UserModel from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import axios from 'axios'

const protect = asyncHandler(async (req, res, next) => {
  let token = ''
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decode = jwt.verify(token, process.env.JWT_SECRET)
      //return all user related data excluding password
      req.user = await getuserData(decode.id)
      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authroized, token failed')
    }
  }
  if (!token) {
    res.status(401)
    throw new Error('Not authorize')
  }
})

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(404)
    throw new Error('Not authrized as admin')
  }
}

const getuserData = asyncHandler(async (id) => {
  const { data } = await axios.get(`${process.env.DBBASEURL}user?id=${id}`)
  return {
    name: data[0].name,
    email: data[0].email,
    age: data[0].name,
    id: data[0].id,
  }
})

export { protect, admin }
