import express from 'express'
import { addOrderItems, getMyOrders, getOrderById, getOrders, updateOrderToPaid } from '../controllers/order.js'
import { admin, protect } from '../middlewares/auth.js'

const router = express.Router()


router.route('/')
    .post(protect, addOrderItems)
    .get(protect, admin, getOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/my/orders').get(protect, getMyOrders)

export default router