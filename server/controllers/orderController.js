require('dotenv').config()
const { isValidObjectId } = require('mongoose')
const Order = require('../models/orderModel')
const Customer = require('../models/customerModel')
const extractUserId = require('../auth/auth')

const getAllOrders = async (req, res) => {
    const user_id = extractUserId(req)
    const customer = await Customer.findOne({ user_id }).select('_id')

    const orders = await Order.find({ customer_id: customer._id })
    res.status(200).json(orders)
}

const storeOrder = async (req, res) => {
    const { foods, total_amount, payment_type } = req.body
    const user_id = extractUserId(req)
    const customer = await Customer.findOne({ user_id }).select('_id')

    const errorFields = { error : "Pleae fill in all fields"}

    if(!foods) {
        return res.status(400).json(errorFields)
    }
    if(!total_amount) {
        return res.status(400).json(errorFields)
    }
    if(!payment_type) {
        return res.status(400).json(errorFields)
    }
    
    try {
        const order = await Order.create({ 
            customer_id: customer._id, 
            foods,
            total_amount, 
            payment_type })
            
        res.status(200).json(order)

    } catch (error) {
        res.status(500).json({ error : error.message })
    }
}

const getOrderDetails = async (req, res) => {
    const { id } = req.params

    if(!isValidObjectId(id)) {
        return res.status(404).json({ error : "No such order"})
    }

    const order = await Order.findById({ _id: id})

    if(!order) {
        return res.status(400).json({ error : "No such order"})
    }

    res.status(200).json(order)
}

module.exports = {
    getAllOrders,
    storeOrder,
    getOrderDetails
}