import express from 'express'
import { addOrderItems, getOrderById } from '../controllers/order.js'
import { protect } from '../middlewares/auth.js'

const router = express.Router()

router.route('/').post(protect, addOrderItems)
router.route('/:id').get(protect, getOrderById)

export default router