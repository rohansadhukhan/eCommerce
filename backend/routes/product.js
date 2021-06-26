import express from 'express'
import { protect, admin } from '../middlewares/auth.js'
import { getProducts, getProductById, deleteProduct } from '../controllers/product.js'
const router = express.Router()

router.route('/').get(getProducts)
router.route('/:id').get(getProductById)
    .delete(protect, admin, deleteProduct)

export default router