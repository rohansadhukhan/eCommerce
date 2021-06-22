import dotenv from 'dotenv'
import express from 'express'
import connectDB from './config/db.js'
import colors from 'colors'
import { notFound, errorHandler } from './middlewares/errorHandler.js'

import productRouter from './routes/product.js'

dotenv.config()
connectDB()

const port = process.env.PORT || 4000
const app = express()

app.use('/api/products', productRouter)

app.get('/', (req, res) => {
    res.send('hi')
})

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server in running on http://localhost:${port} in ${process.env.NODE_ENV} mode`.yellow.bold)
})