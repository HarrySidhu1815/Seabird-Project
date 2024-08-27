import express from 'express'
import { getAllResources } from '../controllers/resource.controller.js'

const router = express.Router()

router.get('/', getAllResources)

export default router