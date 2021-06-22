const express = require('express')
const products = require('./products')

const app = express()
// app.use(express.json())

app.get('/', (req, res) => {
    res.send('hi')
})

app.get('/products', (req, res) => {
    res.json(products)
})

app.get('/product/:id', (req, res) => {
    const product = products.find((p) => p._id === req.params.id)
    res.json(product)
})

app.listen(4000, () => {
    console.log(`Server in running on http://localhost:4000`)
})