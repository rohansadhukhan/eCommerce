import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../models/Product.js'
import { getProducts, getProductById } from '../controllers/product.js'
const router = express.Router()

router.route('/').get(getProducts)
router.route('/:id').get(getProductById)

export default router