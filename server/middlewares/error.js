const ErrorResponse = require('../utils/errorResponse')
const { Prisma } = require('@prisma/client')

errorCodes = {
  UNIQUE_CONSTRAINT_FAILED: 'P2002',
  FOREIGN_KEY_CONSTRAINT_FAILED: 'P2003'
}

const errorHandler = (err, req, res, next) => {
  let error = { ...err }

  error.message = err.message

  if (
    err instanceof Prisma.PrismaClientValidationError ||
    err instanceof Prisma.PrismaClientUnknownRequestError ||
    err.code === errorCodes.FOREIGN_KEY_CONSTRAINT_FAILED
  ) {
    const message = 'Invalid form request'
    error = new ErrorResponse(message, 400)
  }

  if (err.code === errorCodes.UNIQUE_CONSTRAINT_FAILED) {
    const fields = err.meta.target.join(', ')

    const message = `${fields} must be unique`
    error = new ErrorResponse(message, 400)
  }
  console.log(err)
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error'
  })
}

module.exports = errorHandler
