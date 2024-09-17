import express from 'express'
import { deleteUser, fetchUser, test } from '../controllers/user.controller.js'
import { verifyUser } from '../utils/verifyUser.js'

const router = express.Router()

router.post('/', fetchUser)
router.delete('/remove/:id', deleteUser)

export default router