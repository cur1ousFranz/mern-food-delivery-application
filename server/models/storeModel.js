const mongoose = require('mongoose')
const Schema = mongoose.Schema

const storeSchema = new Schema({
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
        default: null
    },
    store_name: {
        type: String,
        required: true
    },
    brand_name: {
        type: String,
        required: true
    },
    food_categories: {
        type: [{
            category_name: { type: String, required: true },
        }],
        default: null
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
    },
    image: {
        type: String,
        default: null
    },
    open_hours: {
        type: String,
        default: null
    }
}, { timestamps: true })

module.exports = mongoose.model('Store', storeSchema)