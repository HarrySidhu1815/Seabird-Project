import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import videoRoutes from './routes/video.routes.js'
import resourceRoutes from './routes/resource.routes.js'
import cookieParser from 'cookie-parser'
import path from 'path'
dotenv.config()

const app = express()
const PORT = 3000 || process.env.PORT

const __dirname = path.resolve()

app.use(express.static(path.join(__dirname, '/client/dist')))

app.use(express.json())

app.use(cookieParser())

mongoose.connect(
    'mongodb+srv://harjobanpreet15:chhiIIDrNO5M8OH1@seabird-island.sepyseq.mongodb.net/seabird-db?retryWrites=true&w=majority&appName=seabird-island'
).then(()=>{
    console.log('MongoDB Connected')
}).catch((error)=> {
    console.log(error)
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

app.use('/api/user', userRoutes)
app.use('/api/auth' , authRoutes)
app.use('/api/videos' , videoRoutes)
app.use('/api/resources' , resourceRoutes)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})