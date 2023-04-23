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
    },
    has_instructions: {
        type: Boolean,
        require: true
    },
    has_choices: {
        type: Boolean,
        required: true,
    },
    food_choices: {
        type: [{
            title: { type: String, required: true },
            type: { type: String, required: true },
            options: {
                type: [{
                    option_name: { type: String, required: true },
                    option_price: { type: Number, required: true }
                }]
            }
        }],
    },
    image: {
        type: String,
        default: null
    }

}, { timestamps: true })

module.exports = mongoose.model('Food', foodSchema)