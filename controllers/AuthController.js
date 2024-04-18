import BadRequestError from "../errors/bad-request.js";
import UnauthenticatedError from '../errors/unauthenticated.js'
import User from "../models/User.js"
import StatusCodes from 'http-status-codes'
import sendEmail from "../utils/sendEmail.js";
import crypto from 'crypto'
import { attachCookieToResponse } from "../utils/jwt.js";
import NotFoundError from "../errors/not-found.js";
import uploadImage from "../utils/uploadImage.js";
import { log } from "console";
const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new BadRequestError('Please provide email and password');
    }
    const user = await User.findOne({ email })
    if (!user) {
        throw new UnauthenticatedError('invalid username or password')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('invalid username or password')
    }
    if (!user.isVerified) {
        throw new UnauthenticatedError('please verify your email')
    }
    attachCookieToResponse(res, { userId: user._id, role: user.role })
    res.status(StatusCodes.OK).json({ user: { city: user.city, name: user.name, email, image: user.image, _id: user._id, role: user.role } })
}
const register = async (req, res) => {
    const { name, email, password } = req.body;
    let role = 'user'
    if (!name || !email || !password) {
        throw new BadRequestError('please provide all required credentials')
    }
    const isUserAlreadyExists = await User.findOne({ email })
    if (isUserAlreadyExists) {
        throw new BadRequestError('the email already exists')
    }

    const isFirstAccount = (await User.countDocuments()) ? false : true;
    if (isFirstAccount) role = 'admin'
    const verificationToken = crypto.randomBytes(40).toString('hex')
    const user = await User.create({ name, email, password, role, verificationToken })
    const origin = 'https://meublux.onrender.com/'
    await sendEmail(email, name, verificationToken, email, origin)
    res.status(StatusCodes.CREATED).json({ msg: 'account successfully created. please verify your email' })
}
const updateUser = async (req, res) => {
    const { params: { id: userId }, body: { name, email, image, city } } = req

    if (!name || !email) {
        throw new BadRequestError('please provide both name and email')
    }
    const isUserExists = await User.findById(userId)
    if (!isUserExists) {
        throw new NotFoundError('no user with id : ' + userId)
    }
    const isEmailAlreadyexists = await User.findOne({ email, _id: { $ne: userId } })
    if (isEmailAlreadyexists) {
        throw new BadRequestError('the email already exists')
    }
    const editObject = { name, email }
    if (image) {
        if (!image.startsWith('http')) {
            [editObject.image] = await uploadImage([req.body.image])
        }
        else {
            editObject.image = image
        }
    }
    if (city) {
        editObject.city = city
    }
    const user = await User.findByIdAndUpdate(userId, editObject, {
        new: true,
        runValidators: true,
    })
    res.status(StatusCodes.OK).send({ user: { city: user.city, name: user.name, email, image: user.image, _id: user._id, role: user.role } })
}
const verifyEmail = async (req, res) => {
    const { email, verificationToken } = req.body
    const isAccountAlreadyVerified = await User.findOne({ email, isVerified: true })
    if (isAccountAlreadyVerified) {
        const user = isAccountAlreadyVerified
        attachCookieToResponse(res, { userId: user._id, role: user.role })
        return res.status(StatusCodes.OK).json({ user: { city: user.city, name: user.name, email, image: user.image, _id: user._id, role: user.role } })
    }
    const user = await User.findOne({ email, verificationToken })
    if (!user) {
        throw new UnauthenticatedError('your verification is failed')
    }
    user.verificationToken = ''
    user.isVerified = true
    user.verified = Date.now()
    await user.save()
    attachCookieToResponse(res, { userId: user._id, role: user.role })
    res.status(StatusCodes.OK).json({ user: { city: user.city, name: user.name, email, image: user.image, _id: user._id, role: user.role } })
}
const loginWithGoogle = async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        throw new BadRequestError('please provide all required credentials')
    }
    let user = await User.findOne({ email })
    if (!user) {
        user = await User.create({ name, email, isVerified: true, verified: Date.now() })
    }
    attachCookieToResponse(res, { userId: user._id, role: user.role })
    res.status(StatusCodes.OK).json({ user: { city: user.city, name: user.name, email, image: user.image, _id: user._id, role: user.role } })

}
const showMe = async (req, res) => {
    const user = await User.findById(req.user.userId)
    res.status(StatusCodes.OK).json({ user: { city: user.city, name: user.name, email: user.email, image: user.image, _id: user._id, role: user.role } })
}
const logout = async (req, res) => {

    res.cookie('accessToken', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    });
    res.cookie('refreshToken', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    });
    res.status(StatusCodes.OK).json({ msg: 'successfully logged out' })
}


export {
    login,
    register,
    updateUser,
    verifyEmail,
    logout,
    loginWithGoogle,
    showMe
}