import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide a name'],
        trim: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: [true, 'please provide an email'],
        validate: {
            validator: validator.isEmail,
            message: 'please provide a valid email'
        },
        unique: true,
    },
    password: {
        type: String,
        minlength: 6,
    },
    city: {
        type: String,
        default: 'Casablanca'
    },
    image: {
        type: String,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    verificationToken: String,
    isVerified: {
        type: Boolean,
        default: false
    },
    verified: Date,
})

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
userSchema.methods.createJWT = function () {
    const token = jwt.sign({ userId: this._id, role: this.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })
    return token
}

userSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}
export default mongoose.model('User', userSchema)

