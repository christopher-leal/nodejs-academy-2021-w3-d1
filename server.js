require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const mongoose = require('mongoose')

const app = express()

app.use(morgan('tiny'))
app.use(cors())
app.use(helmet())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI, (error) => {
  if (error) return console.log(error)
  console.log('Database connected')
})

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Server online'
  })
})

app.use(require('./src/routes'))

app.listen(PORT, () => console.log(`Server listening port ${PORT}`))
