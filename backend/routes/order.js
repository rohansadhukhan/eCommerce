import express from 'express'
import { addOrderItems, getMyOrders, getOrderById, updateOrderToPaid } from '../controllers/order.js'
import { protect } from '../middlewares/auth.js'

const router = express.Router()


router.route('/').post(protect, addOrderItems)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/my/orders').get(protect, getMyOrders)

export default router