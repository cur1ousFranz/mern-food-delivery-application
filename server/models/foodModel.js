const mongoose = require('mongoose')

const Schema = mongoose.Schema

const foodSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    },
    price: {
        type: Number,
        required: true,
    }
}, { timestamps: true })

module.exports = mongoose.model('Food', foodSchema)