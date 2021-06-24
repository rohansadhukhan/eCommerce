import dotenv from 'dotenv'
import express from 'express'
import connectDB from './config/db'
import { notFound, errorHandler } from './middlewares/errorHandler'
import morgan from 'morgan'

import productRouter from './routes/product'
import userRouter from './routes/user'
import orderRouter from './routes/order'

dotenv.config()
connectDB()

const port = process.env.PORT || 4000
const app = express()

app.use(express.json())

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)

app.get('/', (req, res) => {
    res.send('hi')
})

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server in running on http://localhost:${port} in ${process.env.NODE_ENV} mode`.yellow.bold)
})