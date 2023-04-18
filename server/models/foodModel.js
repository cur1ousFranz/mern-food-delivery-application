const mongoose = require('mongoose')

const Schema = mongoose.Schema

const foodSchema = new Schema({
    store_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        requierd: true
    },
    available: {
        type: Boolean,
        default: true
    },
    price: {
        type: Number,
        required: true,
    }
}, { timestamps: true })

module.exports = mongoose.model('Food', foodSchema)