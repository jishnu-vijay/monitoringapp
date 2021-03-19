import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import urlRoutes from './routes/urlRoutes.js'
import bodyParser from "body-parser";
import connectDB from './config/db.js'
import cors from 'cors'
import morgan from 'morgan'

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors())


app.use('/api/auth', authRoutes)
app.use('/api/url', urlRoutes)


const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)
