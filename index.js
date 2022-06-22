import express from 'express'
import dotenv from 'dotenv'
import { errorHandler, notfound } from './middleware/errorHandler.middleware.js'
import userRoute from './routes/user.routes.js'
import encRoute from './routes/enc.routes.js'
import movieRoute from './routes/movie.routes.js'
import morgon from 'morgan'
import color from 'colors'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3001

if (process.env.NODE_ENV == 'development') {
  app.use(morgon('dev'))
}

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Welcome to movie API')
})

app.use('/api/users', userRoute)
app.use('/api/movies', movieRoute)
app.use('/api/enc', encRoute)

app.use(notfound)
app.use(errorHandler)

export default app.listen(
  PORT,
  console.log(
    `Server is runnig on ${process.env.NODE_ENV} and Lisrening on PORT:${PORT}`
      .yellow.bold
  )
)
