import express from 'express'

import {
    login,
    register,
    updateUser,
    verifyEmail,
    logout,
    loginWithGoogle,
    showMe
} from '../controllers/AuthController.js'
import { authenticateUser } from '../middleware/authentication.js'

const router = express.Router()


router.route('/login').post(login)
router.route('/register').post(register)
router.route('/updateUser/:id').post(updateUser)
router.route('/verifyEmail').post(verifyEmail)
router.route('/logout').get(logout)
router.post('/loginWithGoogle', loginWithGoogle)
router.get('/showMe', authenticateUser, showMe)

export default router


