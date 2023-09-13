require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const compression = require('compression')
const cors = require('cors')
const db = require('./config/connection')
const SendJson = require('./shared/SendJson')
const app = express()

db.connect()

app.use(cors({ origin: '*' }))
app.use(logger('dev'))
app.use(compression({ level: 6 }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const busRoute = require('./Routes/busRoute')
const userRoute = require('./Routes/userRoute')

app.use('/buses',busRoute)
app.use('/users',userRoute)

app.use((req, res) =>
    SendJson(res, res.result ? res.result : { message: 'Page not found', code: 404 })
)

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`App running on port ${port}`))