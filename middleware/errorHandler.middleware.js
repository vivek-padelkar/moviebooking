const   notfound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  next(error)
}

const   errorHandler = (error, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? null : error.stack,
  })
}

export { notfound, errorHandler }
