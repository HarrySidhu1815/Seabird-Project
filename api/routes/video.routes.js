import express from 'express'
import { getAllVideos } from '../controllers/video.controller.js'

const router = express.Router()

router.post('/', getAllVideos)

export default router