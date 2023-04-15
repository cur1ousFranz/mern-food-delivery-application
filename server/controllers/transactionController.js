const { isValidObjectId } = require('mongoose')
const Transaction = require('../models/transactionModel')
const Order = require('../models/orderModel')
const Delivery = require('../models/deliveryModel')
const Customer = require('../models/customerModel')
const extractUserId = require('../auth/auth')

const getAllTransactions = async (req, res) => {
    const user_id = extractUserId(req)
    const customer = await Customer.findOne({ user_id }).select('_id')

    const transactions = await Transaction.find({ customer_id: customer._id })
    res.status(200).json(transactions)
}

const storeTransaction = async (req, res) => {
    const { order_id, delivery_id} = req.body
    const user_id = extractUserId(req)
    const customer = await Customer.findOne({ user_id }).select('_id')

    const errorFields = { error: 'Please fill in all fields' }
    
    if(!order_id){
        return res.status(400).json(errorFields)
    }
    if(!delivery_id){
        return res.status(400).json(errorFields)
    }
    if(!isValidObjectId(order_id) || !isValidObjectId(delivery_id)){
        return res.status(400).json({ error: "Some fields are invalid"})
    }

    const order = await Order.findById({ _id: order_id })
    const delivery = await Delivery.findById({ _id: delivery_id })

    if(!order || !delivery) {
        return res.status(404).json({ error: "Some fields are invalid" })
    }

    try {
        const transaction = await Transaction.create({ order_id, customer_id: customer._id, delivery_id })
        res.status(200).json(transaction)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getTransactionDetails = async (req, res) => {
    const { id } = req.params 

    if(!isValidObjectId(id)){
        return res.status(400).json({ error: "No such transaction"})
    }

    const transaction = await Transaction.findById({ _id: id })

    if(!transaction){
        return res.status(404).json({ error: "No such transaction"})
    }

    res.status(200).json(transaction)
}

module.exports = {
    getAllTransactions,
    storeTransaction,
    getTransactionDetails
}