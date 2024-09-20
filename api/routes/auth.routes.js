import express from 'express'
import { resetPassword, signin, signout, signup, updatePassword } from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/reset-password', resetPassword)
router.post('/update-password', updatePassword)
router.get('/signout', signout)

export default router