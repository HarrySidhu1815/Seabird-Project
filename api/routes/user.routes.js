import express from 'express'
import { deleteUser, test } from '../controllers/user.controller.js'
import { verifyUser } from '../utils/verifyUser.js'

const router = express.Router()

router.get('/', test)
router.delete('/delete:id', verifyUser, deleteUser)

export default router