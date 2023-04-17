const mongoose = require('mongoose')
const Schema = mongoose.Schema

const merchantSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    store_address: {
        type: String,
        required: true
    },
    floor_suit: {
        type: String,
        required: true
    },
    store_name: {
        type: String,
        required: true
    },
    business_type: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    contact_number: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Merchant', merchantSchema)