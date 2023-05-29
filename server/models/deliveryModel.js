const mongoose = require('mongoose')
const Schema = mongoose.Schema

const deliverySchema = new Schema({
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Delivery', deliverySchema)