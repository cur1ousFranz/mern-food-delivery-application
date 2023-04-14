const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
    customer_id: {
        type: String,
        required: true
    },
    food_id: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    payment_type: {
        type: String,
        required: true
    }
}, { timestamps: true})

module.exports = mongoose.model('Order', orderSchema)