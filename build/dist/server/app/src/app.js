const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')

const indexRouter = require('./routes')
const sharesRouter = require('./routes/shares')
const filesRouter = require('./routes/files')
const authRouter = require('./routes/auth')
const authFilter = require('./filter/auth-filter')

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))

app.use('/', indexRouter)
app.use('/shares', authFilter, sharesRouter)
app.use('/files', filesRouter)
app.use('/auth', authRouter)

module.exports = app
