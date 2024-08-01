import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
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