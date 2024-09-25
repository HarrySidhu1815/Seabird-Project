import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    admin: {
        type: String,
        required: true
    },
    termsAgreed: { 
        type: Boolean, 
        default: false 
    },
}, {timestamps: true})

const User = mongoose.model('User', userSchema)

export default User