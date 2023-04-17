const { isValidObjectId } = require('mongoose')
const Delivery = require('../models/deliveryModel')
const Order = require('../models/orderModel')
const Customer = require('../models/customerModel')
const extractUserId = require('../auth/extractUserId')

const getAllDeliveries = async (req, res) => {
    const user_id = extractUserId(req)
    const customer = await Customer.findOne({ user_id }).select('_id')

    const deliveries = await Delivery.find({ customer_id: customer._id })
    res.status(200).json(deliveries)
}

const storeDelivery = async (req, res) => {
    const { order_id, status } = req.body
    const user_id = extractUserId(req)
    const customer = await Customer.findOne({ user_id }).select('_id')

    const error = { error: 'Please fill in all field' }

    if(!order_id){
        return res.status(400).json(error)
    }
    if(!status){
        return res.status(400).json(error)
    }
    if(!isValidObjectId(order_id)){
        return res.status(400).json({ error: "No such order" })
    }

    const order = await Order.findById({ _id: order_id })

    if(!order) {
        return res.status(404).json({ error: "No such order" })
    }

    try {
        const delivery = await Delivery.create({ order_id, status, customer_id: customer._id })
        res.status(200).json(delivery)
    } catch (error) {
        res.status(500).json({ error : error.message })
    }
}

const getDeliveryDetails = async (req, res) => {
    const { id } = req.params

    if(!isValidObjectId(id)){
        return res.status(400).json({ error: "No such delivery" })
    }

    const delivery = await Delivery.findById({ _id: id })

    if(!delivery){
        return res.status(404).json({ error: "No such delivery" })
    }

    res.status(200).json(delivery)
}

module.exports = {
    getAllDeliveries,
    storeDelivery,
    getDeliveryDetails
}