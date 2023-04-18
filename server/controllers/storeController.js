const Store = require('../models/storeModel')
const User = require('../models/userModel')
const createToken = require('../auth/createToken')
const { isValidObjectId } = require('mongoose')

const getAllStores = async (req, res) => {
    const stores = await Store.find()
    res.status(200).json(stores)
}

const storeStore = async (req, res) => {
    const { email, password, store_address, floor_suit, store_name, food_categories,
        business_type, first_name, last_name, contact_number
    } = req.body

    const role = 'store'
    const verified = false

    try {
        const user = await User.signup(email, password, role)
        await Store.create({
            user_id: user._id,
            store_address,
            floor_suit,
            store_name,
            food_categories,
            business_type,
            first_name,
            last_name,
            contact_number,
            verified
        })

        const token = createToken(user._id)
        res.status(200).json({ email, token })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getStoreDetails = async (req, res) => {
    const { id } = req.params

    if (!isValidObjectId(id)) {
        return res.status(404).json({ error: "No such store" })
    }

    const store = await Store.findById({ _id: id })

    if (!store) {
        return res.status(400).json({ error: "No such store" })
    }

    res.status(200).json(store)
}

module.exports = {
    getAllStores,
    storeStore,
    getStoreDetails
}