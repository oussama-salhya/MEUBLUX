import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
import UnauthenticatedError from '../errors/unauthenticated.js'
import UnauthorizedError from '../errors/unauthorized.js'
import { attachCookieToResponse } from '../utils/jwt.js'


const authenticateUser = async (req, res, next) => {
    const { accessToken, refreshToken } = req.signedCookies
    if (!accessToken && !refreshToken) {
        throw new UnauthenticatedError('authentication is required')
    }
    try {
        if (accessToken) {
            const user = jwt.verify(accessToken, process.env.JWT_SECRET)
            req.user = { userId: user.userId, role: user.role }
            return next();
        }
        if (refreshToken) {
            const { user } = jwt.verify(refreshToken, process.env.JWT_SECRET)
            attachCookieToResponse(res, { userId: user.userId, role: user.role })
            req.user = { userId: user.userId, role: user.role }
        }
        next()
    } catch (error) {
        throw new UnauthenticatedError('authentication is required')
    }
}

const oldauthenticateUser = async (req, res, next) => {
    let token = req.headers.authorization
    console.log(token);
    if (!token || !token.startsWith('Bearer ')) {
        throw new UnauthenticatedError('please provide a token')
    }
    token = token.split(' ')[1]
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { userId: user.userId, role: user.role }
        next()
    } catch (error) {
        throw new UnauthenticatedError('authentication invalid')
    }

}
const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            if (req.user.role === 'test') {
                throw new UnauthorizedError('read only for Demo app')
            }
            throw new UnauthorizedError('not authorized to access this route')
        }
        console.log(req.user);
        next()
    }
}



export {
    authenticateUser,
    authorizePermissions
}