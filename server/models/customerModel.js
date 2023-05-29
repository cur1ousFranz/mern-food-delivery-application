const mongoose = require('mongoose')

const Schema = mongoose.Schema

const customerSchema = new Schema({
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    name: {
        type: String,
    },
    contact_number: {
        type: String,
    },
    address: {
        type: String,
    }
}, { timestamps: true })

module.exports = mongoose.model('Customer', customerSchema)