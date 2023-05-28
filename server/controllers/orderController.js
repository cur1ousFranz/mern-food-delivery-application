require('dotenv').config()
const { isValidObjectId } = require('mongoose')
const Order = require('../models/orderModel')
const Customer = require('../models/customerModel')
const extractUserId = require('../auth/extractUserId')
// Websockets
const io = require('../websocketServer')

const getAllOrders = async (req, res) => {
    const user_id = extractUserId(req)
    const customer = await Customer.findOne({ user_id }).select('_id')

    const orders = await Order.find({ customer_id: customer._id })
    res.status(200).json(orders)
}

const storeOrder = async (req, res) => {
    const {
        food_id,
        store_id,
        food_quantity,
        has_choices,
        choice_options,
        has_instructions,
        instruction,
        total_price,
        payment_type,
        status
    } = req.body
    const user_id = extractUserId(req)
    const customer = await Customer.findOne({ user_id }).select('_id')

    try {
        const order = await Order.create({
            customer_id: customer._id,
            food_id,
            store_id,
            food_quantity,
            has_choices,
            choice_options,
            has_instructions,
            instruction,
            total_price,
            payment_type,
            status
        })

        io.emit('send-message', 'hey')
        console.log('ran')

        res.status(200).json(order)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getOrderDetails = async (req, res) => {
    const { id } = req.params

    if (!isValidObjectId(id)) {
        return res.status(404).json({ error: "No such order" })
    }

    const order = await Order.findById({ _id: id })

    if (!order) {
        return res.status(400).json({ error: "No such order" })
    }

    res.status(200).json(order)
}

module.exports = {
    getAllOrders,
    storeOrder,
    getOrderDetails
}