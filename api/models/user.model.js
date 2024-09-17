import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: true
    },
    lastActivity: {
        type: Date,
        default: Date.now,
      }
}, {timestamps: true})

const User = mongoose.model('User', userSchema)

export default User