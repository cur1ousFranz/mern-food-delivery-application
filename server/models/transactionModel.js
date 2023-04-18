const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
    order_id: {
        type: String,
        required: true
    },
    store_id: {
        type: String,
        required: true
    },
    customer_id: {
        type: String,
        required: true
    },
    delivery_id: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Transcation', transactionSchema)