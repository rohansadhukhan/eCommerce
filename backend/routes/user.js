import express from 'express'
import { protect } from '../middlewares/auth.js'
import { authUser, getUserProfile, registerUser, updateUserProfile } from '../controllers/user.js'
const router = express.Router()

router.route('/').post(registerUser)
router.route('/login').post(authUser)
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

export default router