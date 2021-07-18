import express from 'express'
import { protect, admin } from '../middlewares/auth.js'
import { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview, getTopProducts } from '../controllers/product.js'
const router = express.Router()


router.route('/top').get(getTopProducts)

router.route('/')
    .get(getProducts)
    .post(protect, admin, createProduct)
    
router.route('/:id')
    .get(getProductById)
    .put(protect, admin, updateProduct)
    .delete(protect, admin, deleteProduct)

router.route('/:id/reviews')
    .post(protect, createProductReview)


export default router