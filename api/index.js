import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoute from './routes/password.routes.js'
dotenv.config()

const app = express()
const PORT = 3000 || process.env

mongoose.connect(process.env.MONGO_DB_URL).then(()=>{
    console.log('MongoDB Connected')
}).catch((error)=> {
    console.log(error)
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

app.use('/api/password', userRoute)