import express from 'express'
import { addOrderItems } from '../controllers/order'
import { protect } from '../middlewares/auth'

const router = express.Router()

router.route('/').post(protect, addOrderItems)

export default router