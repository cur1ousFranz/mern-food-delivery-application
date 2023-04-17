const mongoose = require('mongoose')

const Schema = mongoose.Schema

const businessTypeSchema = new Schema({
    name: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('BusinessType', businessTypeSchema)