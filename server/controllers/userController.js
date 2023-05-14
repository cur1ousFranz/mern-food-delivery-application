require('dotenv').config()
const User = require('../models/userModel')
const Customer = require('../models/customerModel')
const Store = require('../models/storeModel')
const createToken = require('../auth/createToken')
const { isValidObjectId } = require('mongoose')
const bcrypt = require('bcrypt')

const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        let id
        const user = await User.login(email, password)
        if (user.role === 'customer') {
            const customer = await Customer.findOne({ user_id: user._id })
            id = customer._id
        }
        if (user.role === 'store') {
            const store = await Store.findOne({ user_id: user._id })
            id = store._id
        }

        const token = createToken(user._id)
        res.status(200).json({ email, token, is_role: user.role, id })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updateCustomerPassword = async (req, res) => {
    const { id } = req.params
    const { password } = req.body

    if (!isValidObjectId(id)) {
        return res.status(404).json({ error: "No such customer" })
    }

    const customer = await Customer.findById({ _id: id })

    if (!customer) {
        return res.status(400).json({ error: "No such customer" })
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    await User.findByIdAndUpdate({ _id: customer.user_id }, { password: hash })

    return res.status(200).json({ data: 'Password updated successfully' })
}

module.exports = {
    loginUser,
    updateCustomerPassword
}