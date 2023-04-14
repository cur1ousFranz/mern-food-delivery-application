const { isValidObjectId } = require('mongoose')
const Order = require('../models/orderModel')

const getAllOrders = async (req, res) => {

    res.status(200).json({ })
}

const storeOrder = async (req, res) => {
    
    res.status(200).json({})
}

const getOrderDetails = async (req, res) => {
    

    res.status(200).json({})
}

module.exports = {
    getAllOrders,
    storeOrder,
    getOrderDetails
}