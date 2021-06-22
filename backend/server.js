import dotenv from 'dotenv'
import express from 'express'
import products from './products.js'
import connectDB from './config/db.js'
import colors from 'colors'

dotenv.config()
connectDB()

const port = process.env.PORT || 4000
const app = express()

app.get('/', (req, res) => {
    res.send('hi')
})

app.get('/api/products', (req, res) => {
    res.json(products)
})

app.get('/api/product/:id', (req, res) => {
    const product = products.find((p) => p._id === req.params.id)
    res.json(product)
})

app.listen(port, () => {
    console.log(`Server in running on http://localhost:${port} in ${process.env.NODE_ENV} mode`.yellow.bold)
})