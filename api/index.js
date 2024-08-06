import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
dotenv.config()

const app = express()
const PORT = 3000 || process.env

app.use(express.json())

mongoose.connect(process.env.MONGO_DB_URL).then(()=>{
    console.log('MongoDB Connected')
}).catch((error)=> {
    console.log(error)
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

app.use('/api/user', userRoutes)
app.use('/api/auth' , authRoutes)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})