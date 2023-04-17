const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique : true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
}, { timestamps: true })

// statics
userSchema.statics.signup = async function(email, password, role){
    if(!email) {
        throw Error('Email is required.')
    }
    if(!password){
        throw Error('Password is required.')
    }
    if(!validator.isEmail(email)){
        throw Error('Email is invalid.')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password not strong enough.')
    }

    const exist = await this.findOne({ email })

    if(exist) {
        throw Error('Email already exist.')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password : hash, role})

    return user
}

userSchema.statics.login = async function(email, password){
    if(!email || !password) {
        throw Error('Please fill in all fields')
    }
    if(!validator.isEmail(email)){
        throw Error('Invalid credentials')
    }

    const user = await this.findOne({ email })

    if(!user) {
        throw Error('Invalid credentials')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error('Invalid credentials')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)