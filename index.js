import express from 'express'
import dotenv from 'dotenv'
import { errorHandler, notfound } from './middleware/errorHandler.middleware.js'
import userRoute from './routes/user.routes.js'
import encRoute from './routes/enc.routes.js'
import morgon from 'morgan'
import color from 'colors'
import { getEncryptedDate, getDecryptedDate } from './utils/enc.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3001

if (process.env.NODE_ENV == 'development') {
  app.use(morgon('dev'))
}

app.use(express.json())

app.use('/api/user', userRoute)
app.use('/api/user', userRoute)
app.use('/api/user', userRoute)
app.use('/api/enc', encRoute)

app.use(notfound)
app.use(errorHandler)

app.listen(
  PORT,
  console.log(
    `Server runnig on ${process.env.NODE_ENV} and Lisrening on PORT:${PORT}`
      .yellow.bold
  )
)
