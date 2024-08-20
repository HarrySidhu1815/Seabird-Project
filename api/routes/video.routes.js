import express from 'express'
import { getAllVideos } from '../controllers/video.controller.js'

const router = express.Router()

router.get('/', getAllVideos)

export default router