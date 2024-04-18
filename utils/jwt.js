import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { log } from 'console'
const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET)

const attachCookieToResponse = (res, user) => {
    const accessToken = jwt.sign(user, process.env.JWT_SECRET)
    const randomBytes = crypto.randomBytes(40).toString('hex')
    const refreshToken = jwt.sign({ user, refreshToken: randomBytes }, process.env.JWT_SECRET)
    const oneDay = 1000 * 60 * 60 * 24;
    const longerExp = 1000 * 60 * 60 * 24 * 30;

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        signed: true,
        expires: new Date(Date.now() + oneDay),
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        signed: true,
        expires: new Date(Date.now() + longerExp),
    });
}


export {
    isTokenValid,
    attachCookieToResponse
}