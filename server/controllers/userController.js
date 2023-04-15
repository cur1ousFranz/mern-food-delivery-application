require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const Customer = require('../models/customerModel')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn : '3d' })
}

const signupUser = async (req, res) => {
    const { email, password, role } = req.body

    try {
        const user = await User.signup(email, password, role)
        await Customer.create({ user_id: user._id, name: '', contact_number: '', address: ''})
        const token = createToken(user._id)
        res.status(200).json({ email, token})

    } catch (error) {
        res.status(500).json({ error : error.message })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.status(200).json({ email, token })

    } catch (error) {
        res.status(500).json({ error : error.message })
    }
}

module.exports = {
    signupUser,
    loginUser
}