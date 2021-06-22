import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../models/Product.js'
const router = express.Router()

// @desc        Fetch all products
// @route       GET api/products
// @access      public
router.get('/', asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
}))

// @desc        Fetch single product
// @route       GET api/product/:id
// @access      public
router.get('/:id', asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) res.json(product)
    else {
        res.status(404)
        throw new Error('product not found')
    }
}))

export default router