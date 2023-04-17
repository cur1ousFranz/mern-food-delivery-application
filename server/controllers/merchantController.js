const Merchant = require('../models/merchantModel')
const User = require('../models/userModel')
const createToken = require('../auth/createToken')

const getAllMerchants = async (req, res) => {
    const merchants = await Merchant.find()
    res.status(200).json(merchants)
}

const storeMerchant = async (req, res) => {
    const { email, password, store_address, floor_suit, store_name, 
        business_type, first_name, last_name, contact_number
    } = req.body

    const role = 'merchant'
    const verified = false

    try {
        try {
            const user = await User.signup(email, password, role)
            await Merchant.create({ 
                user_id: user._id, 
                store_address, 
                floor_suit,
                store_name,
                business_type,
                first_name,
                last_name,
                contact_number,
                verified
            })

            const token = createToken(user._id)
            res.status(200).json({ email, token})
    
        } catch (error) {
            res.status(500).json({ error : error.message })
        }
    } catch (error) {
        
    }
}

module.exports = {
    getAllMerchants,
    storeMerchant
}