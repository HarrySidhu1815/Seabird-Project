import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js"
import jwt from 'jsonwebtoken'
import { sendEmail } from "../utils/sendEmail.js"

export const signup = async (req, res, next) => {
    const {email, password} = req.body
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({email, password: hashedPassword, admin: false})
    try {
        await newUser.save()
        res.status(201).json({message: "user created successfully"})
    } catch (error) {
        next(error)
    }
}

export const signin = async (req, res, next) => {
    const {email, password} = req.body
    try {
        const validUser = await User.findOne({email})
        if(!validUser) return next(errorHandler(404, 'User not found'))
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if(!validPassword) return next(errorHandler(401, 'Wrong Credentials'))
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET )
        const expiryDate = new Date(Date.now() + 360000)

        validUser.lastActivity = new Date(); 
        await validUser.save();

        const {password: hashedPassword , ...rest} = validUser._doc
    
        res.cookie('access_token', token, {httpOnly: true, expiryDate: expiryDate})
        .status(200)
        .json(rest)
    } catch (error) {
        next(error)
    }
}

export const signout = (req, res) => {
    res.clearCookie('access_token').status(200).json({message: 'Signout successfull'})
}

export const resetPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    const resetToken = jwt.sign({ id: user._id }, 'yourSecretKey', { expiresIn: '1h' });

    const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await sendEmail({
        to: user.email,
        subject: 'Password Reset',
        text: `You requested a password reset. Click the link to reset your password: ${resetURL}`
    });

    return res.status(200).json({ success: true, message: 'Password reset email sent' });
};
