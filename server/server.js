// Require the framework and instantiate it
const express = require('express')

// Routes
const projects = require('./routes/projects')
const investments = require('./routes/investments')

// Middlewares
const logger = require('./middlewares/logger')
const errorHandler = require('./middlewares/error')

const app = express()

// Body parser
app.use(express.json())

app.use(logger)

app.use('/projects', projects)
app.use('/investments', investments)

app.get('/', (req, res) => {
  res.send('Hieu Test')
})

app.use(errorHandler)

// Run the server
const start = async () => {
  try {
    await app.listen(process.env.PORT || 3000)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()
