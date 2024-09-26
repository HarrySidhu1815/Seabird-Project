import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
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

userSchema.pre('save', function (next) {
    this.email = this.email.toLowerCase();
    next();
});

const User = mongoose.model('User', userSchema)

export default User