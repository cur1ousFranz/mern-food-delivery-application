require('dotenv').config()
const { isValidObjectId } = require('mongoose')
const Order = require('../models/orderModel')
const Customer = require('../models/customerModel')
const extractUserId = require('../auth/extractUserId')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
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
        food_name,
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
            customer_id: new ObjectId(customer._id),
            food_id: new ObjectId(food_id),
            store_id: new ObjectId(store_id),
            food_name,
            food_quantity,
            has_choices,
            choice_options,
            has_instructions,
            instruction,
            total_price,
            payment_type,
            status
        })

        // Send the order details to specific store
        // Might use the store id to act as a room of connection
        io.to(order.store_id.toString()).emit('send-order-notif', order)
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

const getAllStoreOrders = async (req, res) => {
    const { id } = req.params

    if (!isValidObjectId(id)) {
        return res.status(404).json({ error: "No such store" })
    }

    // Look for related data in food collection
    // The $unwind used to expect single element in array
    const orders = await Order.aggregate([
        {
            $match: { store_id: new ObjectId(id) }
        },
        {
            $lookup: {
                from: 'foods',
                localField: 'food_id',
                foreignField: '_id',
                as: 'food'
            }
        },
        {
            $unwind: '$food'
        }
    ])

    res.status(200).json(orders)
}

module.exports = {
    getAllOrders,
    storeOrder,
    getOrderDetails,
    getAllStoreOrders
}