const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    store_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    delivery_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Transcation', transactionSchema)