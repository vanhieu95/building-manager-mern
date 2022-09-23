const fs = require('fs')
const morgan = require('morgan')
const path = require('path')

const logDir = './logs'

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir)
}

const serverLogStream = fs.createWriteStream(path.join(logDir, 'server.log'), {
  flags: 'a'
})

const logger = morgan('combined', { stream: serverLogStream })

module.exports = logger
