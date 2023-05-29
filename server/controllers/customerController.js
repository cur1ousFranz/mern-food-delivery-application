const { isValidObjectId } = require('mongoose')
const createToken = require('../auth/createToken')
const Customer = require('../models/customerModel')
const User = require('../models/userModel')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const getAllCustomers = async (req, res) => {
    const customers = await Customer.find()
    res.status(200).json(customers)
}

const storeCustomer = async (req, res) => {
    const { email, password } = req.body
    const role = 'customer'

    try {
        const user = await User.signup(email, password, role)
        const customer = await Customer.create({
            user_id: new ObjectId(user._id),
            name: '',
            contact_number: '',
            address: ''
        })
        const token = createToken(user._id)
        res.status(200).json({ email, token, is_role: user.role, id: customer._id })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updateCustomer = async (req, res) => {
    const { id } = req.params
    const { name, contact_number, address } = req.body

    const errorFields = []
    let errorMessage = 'Please fill in all fields.'

    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: "No such customer" })
    }
    if (!name) {
        errorFields.push('name')
    }
    if (!contact_number) {
        errorFields.push('contact_number')
    }
    if (!address) {
        errorFields.push('address')
    }
    if (errorFields.length > 0) {
        return res.status(400).json({ error: errorMessage, errorFields })
    }

    try {
        const result = await Customer.findByIdAndUpdate({ _id: id }, { name, contact_number, address })

        if (!result) {
            return res.status(404).json({ error: "No such customer" })
        }
        const customer = await Customer.findById({ _id: id })

        res.status(200).json(customer)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getCustomerDetails = async (req, res) => {
    const { id } = req.params

    if (!isValidObjectId(id)) {
        return res.status(404).json({ error: "No such customer" })
    }

    const customer = await Customer.findById({ _id: id })

    if (!customer) {
        return res.status(400).json({ error: "No such customer" })
    }

    res.status(200).json(customer)
}

module.exports = {
    getAllCustomers,
    storeCustomer,
    getCustomerDetails,
    updateCustomer
}