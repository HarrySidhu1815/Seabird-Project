import express from 'express'
import { deleteVideo, generatePresignedUrl, getAllVideos, saveVideoMetaData, updateVideo } from '../controllers/video.controller.js'
import { verifyUser } from '../utils/verifyUser.js'
import multer from 'multer'

const router = express.Router()

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {fileSize: 2 * 1024  * 1024 * 1024}
})

router.post('/', getAllVideos)
router.post('/update/:id', updateVideo)
router.post('/upload-video', saveVideoMetaData)
router.post('/generate-presigned-url', generatePresignedUrl)
router.delete('/remove/:id', deleteVideo)


export default router