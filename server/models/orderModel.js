const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
    customer_id: {
        type: String,
        required: true
    },
    foods: {
        type: [{
            food_id: { type: String, required: true },
            store_id: { type: String, required: true },
            quantity: { type: Number, required: true }
        }],
        required: true
    },
    total_amount: {
        type: Number,
        required: true
    },
    payment_type: {
        type: String,
        required: true
    }
}, { timestamps: true})

module.exports = mongoose.model('Order', orderSchema)