const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    age: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0) {
                throw new Error("Age must be a positive value");
            }
        }

    },
    email: {
        type: "String",
        lowercase: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("please enter a valid email")
            }
        }
    },
    password: {
        type: String,
        minLength: 6,
        trim: true,
        required: true,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error("Password should not contain password")
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens

    return userObject

}
userSchema.methods.generateToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'secretcode')
    user.tokens = user.tokens.concat({ token })
    await user.save()

}
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await Users.findOne({ email })
    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {

        throw new Error('Unable to login')
    }
    return user
}
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const Users = mongoose.model('Users', userSchema);

module.exports = Users
