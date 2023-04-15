const { isValidObjectId } = require('mongoose')
const Customer = require('../models/customerModel')

const getAllCustomers = async (req, res) => {
    const customers = await Customer.find()
    res.status(200).json(customers)
}

const updateCustomer = async (req, res) => {
    const { id } = req.params
    const { name, contact_number, address } = req.body

    const errorFields = { error: "Pleae fill in all fields" }

    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: "No such customer" })
    }
    if (!name) {
        return res.status(400).json(errorFields)
    }
    if (!contact_number) {
        return res.status(400).json(errorFields)
    }
    if (!address) {
        return res.status(400).json(errorFields)
    }
    
    try {
        const result = await Customer.findByIdAndUpdate({  _id: id }, { name, contact_number, address })

        if(!result) {
            return res.status(404).json({ error: "No such customer" })
        }
        const customer = await Customer.findById({ _id: id})

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
    updateCustomer,
    getCustomerDetails
}