import express from 'express'
import { requestAccess, resetPassword, signin, signout, signup, updatePassword, updateTerms } from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/reset-password', resetPassword)
router.post('/update-password', updatePassword)
router.post('/update-terms', updateTerms)
router.get('/signout', signout)
router.post('/request-access', requestAccess)

export default router