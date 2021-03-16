import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import bodyParser from "body-parser";
import connectDB from './config/db.js'
import cors from 'cors'


dotenv.config()

connectDB()

const app = express()

app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors())

app.use('/api/account', accountRoutes)

app.use('/api/purchase', purchaseRoutes)

app.use('/api/sale', saleRoutes)

app.use('/api/user', userRoutes)

app.use('/api/auth', authRoutes)

app.use('/api/ledgers', ledgersRoutes)



app.get('/',(req, res)=>{
    res.send('API running')
})

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)
