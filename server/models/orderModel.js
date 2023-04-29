const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
    customer_id: {
        type: String,
        required: true
    },
    food_id: {
        type: String,
        required: Boolean
    },
    store_id: {
        type: String,
        required: Boolean
    },
    food_quantity: {
        type: Number,
        required: true
    },
    has_choices: {
        type: Boolean,
        required: true
    },
    choice_options: {
        type: [{
            choiceIndex: {type: Number, required: true},
            choiceTitle: {type: String, required: true},
            selectedOption: {
                type : [{
                    optionName : { type: String, required: true},
                    optionPrice : { type: Number, required: true}
                }],
            },
        }],
        default: null
    },
    has_instructions: {
        type: Boolean,
        required: true
    },
    instruction: {
        type: String,
        default: null
    },
    total_price: {
        type: Number,
        required: true
    },
    payment_type: {
        type: String,
        required: true
    }
}, { timestamps: true})

module.exports = mongoose.model('Order', orderSchema)