const Store = require('../models/storeModel')
const User = require('../models/userModel')
const createToken = require('../auth/createToken')
const { isValidObjectId } = require('mongoose')
const multer = require('multer')
const path = require('path')

const getAllStores = async (req, res) => {
    const stores = await Store.find()
    res.status(200).json(stores)
}

const storeStore = async (req, res) => {
    const { email, password, store_address, floor_suit, store_name, brand_name,
        business_type, first_name, last_name, contact_number
    } = req.body
    const role = 'store'
    const verified = false

    const errorFields = []
    let errorMessage = 'Please fill in all fields.'
    if (!store_address) {
        errorFields.push('store_address')
    }
    if (!store_name) {
        errorFields.push('store_name')
    }
    if (!brand_name) {
        errorFields.push('brand_name')
    }
    if (!business_type) {
        errorFields.push('business_type')
    }
    if (!first_name) {
        errorFields.push('first_name')
    }
    if (!last_name) {
        errorFields.push('last_name')
    }
    if (!contact_number) {
        errorFields.push('contact_number')
    }
    if (errorFields.length > 0) {
        return res.status(400).json({ error: errorMessage, errorFields })
    }

    try {
        const user = await User.signup(email, password, role)
        const store = await Store.create({
            user_id: user._id,
            store_address,
            floor_suit,
            store_name,
            brand_name,
            business_type,
            first_name,
            last_name,
            contact_number,
            verified,
        })

        const token = createToken(user._id)
        res.status(200).json({ email, token, is_role: user.role, id: store._id })

    } catch (error) {
        await User.deleteOne({ email })
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

const updateStore = async (req, res) => {
    const { id } = req.params
    const updated = req.body

    if (!isValidObjectId(id)) {
        return res.status(404).json({ error: "No such store" })
    }

    await Store.findByIdAndUpdate({ _id: id }, { ...updated })

    const store = await Store.findById({ _id: id })

    if (!store) {
        return res.status(400).json({ error: "No such store" })
    }

    res.status(200).json(store)
}

const updateStoreImage = async (req, res) => {

    try {
        upload(req, res, async (error) => {
            if (error) {
                return res.status(400).json(error)
            } else {
                const { id } = req.params
                const filename = req.file.filename

                await Store.findByIdAndUpdate({ _id: id }, {
                    image: 'uploads/store/' + filename
                })

                const store = await Store.findById({ _id: id })

                if (!store) {
                    return res.status(400).json({ error: 'No such store' })
                }

                res.status(200).json(store)
            }
        })

    } catch (error) {
        return res.status(400).json(error)
    }
}

// Storing image
const storage = multer.diskStorage({
    destination: './public/uploads/store/',
    filename: (req, file, callback) => {
        callback(null, file.fieldname + '-' + Date.now() +
            path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10000000
    },
    fileFilter: (req, file, callback) => {
        checkFileType(file, callback)
    }
}).single('image')

const checkFileType = (file, callback) => {
    // Allowed extensions
    const fileTypes = /jpeg|jpg|png/
    // Check extension
    const extname = fileTypes.test(
        path.extname(file.originalname).toLowerCase()
    )
    // Check mime
    const mimetype = fileTypes.test(file.mimetype)

    if (mimetype && extname) {
        return callback(null, true)
    } else {
        callback({ error: 'File format is invalid.' })
    }
}

module.exports = {
    getAllStores,
    storeStore,
    getStoreDetails,
    updateStore,
    updateStoreImage
}