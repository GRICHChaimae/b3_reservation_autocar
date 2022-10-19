const express = require('express')
const colors = require('colors')
const dontenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 6000
const test = require('./middleware/authMiddleware')

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

app.use('/api/voyages', require('./routes/voyagesRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/admin', require('./routes/adminRoutes'))
app.use('/api/resrvation', require('./routes/reservationRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port number ${port}`, test))