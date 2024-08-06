import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'

export const signup = async (req, res) => {
    const {username, email, password, admin} = req.body
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({username, email, password: hashedPassword, admin})
    try {
        await newUser.save()
        res.status(200).json({message: "user created successfully"})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}