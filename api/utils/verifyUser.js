import { errorHandler } from "./error.js"
import jwt from 'jsonwebtoken'

export const verifyUser = (req, res, next) => {
    const token = res.cookies.access_token

    if(!token) return next(errorHandler(401, 'You are not Authenticated!'))

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, 'Token is not valid'))
        
        req.user = user
        next()
    })
}