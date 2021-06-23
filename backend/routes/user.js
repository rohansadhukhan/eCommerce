import express from 'express'
import { protect } from '../middlewares/auth.js'
import { authUser, getUserProfile, registerUser } from '../controllers/user.js'
const router = express.Router()

router.route('/login').post(authUser)
router.route('/profile').get(protect, getUserProfile)
router.route('/').post(registerUser)

export default router