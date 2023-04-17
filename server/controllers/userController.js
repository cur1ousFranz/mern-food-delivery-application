require('dotenv').config()
const User = require('../models/userModel')
const createToken = require('../auth/createToken')

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
    loginUser
}