const { isValidObjectId } = require('mongoose')
const Food = require('../models/foodModel')
const Store = require('../models/storeModel')
const extractUserId = require('../auth/extractUserId')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const getAllFoods = async (req, res) => {
    const foods = await Food.find()

    res.status(200).json(foods)
}

const storeFood = async (req, res) => {
    
    let filePath = ''
    try {
        upload(req, res, async (error) => {
            if (error) {
                return res.status(400).json(error)
            } else {
                const { name, description, category, price, has_instructions, has_choices, food_choices } = req.body
                const filename = req.file.filename
                filePath = req.file.path

                const user_id = extractUserId(req)
                const store = await Store.findOne({ user_id }).select('_id')

                const errorFields = []
                let errorMessage = 'Please fill in all fields.'
                if(!name) {
                    errorFields.push('name')
                }
                if(!description) {
                    errorFields.push('description')
                }
                if(!category) {
                    errorFields.push('category')
                }
                if(isNaN(price)) {
                    errorFields.push('price')
                    errorMessage = 'Invalid Input.'
                }
                if(!price) {
                    errorFields.push('price')
                    errorMessage = 'Please fill in all fields.'
                }
                if(errorFields.length > 0) {
                    // Delete image if theres an error
                    fs.unlinkSync(filePath)
                    return res.status(400).json({ error: errorMessage, errorFields })
                }

                const food = await Food.create({ 
                    store_id: store._id, 
                    name, description, 
                    category, price,
                    has_instructions, 
                    has_choices, 
                    food_choices,
                    image: 'uploads/food/' + filename
                })

                res.status(200).json(food)
            }
        })
    } catch (error) {
        fs.unlinkSync(filePath);
        return res.status(400).json(error)
    }
}

const getFoodDetails = async (req, res) => {
    const { id } = req.params

    if (!isValidObjectId(id)) {
        return res.status(404).json({ error: "No such food product" })
    }

    const food = await Food.findById({ _id: id })

    if (!food) {
        return res.status(400).json({ error: "No such food product" })
    }

    res.status(200).json(food)
}

const updateFood = async (req, res) => {
    const { id } = req.params
    const updated = req.body

    if (!isValidObjectId(id)) {
        return res.status(404).json({ error: "No such food product" })
    }

    await Food.findByIdAndUpdate({ _id: id }, { ...updated })
    const food = await Food.findById({ _id: id })

    if (!food) {
        return res.status(400).json({ error: "No such food product" })
    }

    res.status(200).json(food)
}

const deleteFood = async (req, res) => {
    const { id } = req.params

    if (!isValidObjectId(id)) {
        return res.status(404).json({ error: "No such food product" })
    }

    const food = await Food.findByIdAndDelete({ _id: id })

    if (!food) {
        return res.status(400).json({ error: "No such food product" })
    }

    res.status(200).json({ message: 'Delete food' })
}

const getStoreFoods = async (req, res) => {
    const { id } = req.params

    if (!isValidObjectId(id)) {
        return res.status(404).json({ error: "No such store" })
    }

    const foods = await Food.find({ store_id: id }).sort({ createdAt: -1 })

    if (!foods) {
        return res.status(400).json({ error: "No such store" })
    }

    res.status(200).json(foods)
}

// Storing image
const storage = multer.diskStorage({
    destination: './public/uploads/food/',
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
    getAllFoods,
    storeFood,
    getFoodDetails,
    updateFood,
    deleteFood,
    getStoreFoods
}