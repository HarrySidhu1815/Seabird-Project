import express from 'express'
import { deleteLesson, generatePresignedUrl, getAllResources, saveLessonMetaData, updateCurriculum } from '../controllers/resource.controller.js'

const router = express.Router()

router.post('/', getAllResources)
router.post('/update/:id', updateCurriculum)
router.post('/upload-lesson', saveLessonMetaData)
router.post('/generate-presigned-url', generatePresignedUrl)
router.delete('/remove/:id', deleteLesson)

export default router