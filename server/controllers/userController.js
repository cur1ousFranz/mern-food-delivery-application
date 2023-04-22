require('dotenv').config()
const User = require('../models/userModel')
const Customer = require('../models/customerModel')
const Store = require('../models/storeModel')
const createToken = require('../auth/createToken')

const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        let id
        const user = await User.login(email, password)
        if(user.role === 'customer') {
            const customer = await Customer.findOne({ user_id: user._id })
            id = customer._id
        }
        if(user.role === 'store'){
            const store = await Store.findOne({ user_id: user._id })
            id = store._id
        }

        const token = createToken(user._id)
        res.status(200).json({ email, token, is_role: user.role, id})

    } catch (error) {
        res.status(500).json({ error : error.message })
    }
}

module.exports = {
    loginUser
}