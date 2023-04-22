const { isValidObjectId } = require('mongoose')
const Food = require('../models/foodModel')
const Store = require('../models/storeModel')
const extractUserId = require('../auth/extractUserId')


const getAllFoods = async (req, res) => {
    const foods = await Food.find()

    res.status(200).json(foods)
}

const storeFood = async (req, res) => {
    const { name, description, category, price} = req.body
    const user_id = extractUserId(req)
    const store = await Store.findOne({ user_id }).select('_id')

    const errorFields = { error : "Pleae fill in all fields"}

    if(!name) {
        return res.status(400).json(errorFields)
    }
    if(!description) {
        return res.status(400).json(errorFields)
    }
    if(!category) {
        return res.status(400).json(errorFields)
    }
    if(!price) {
        return res.status(400).json(errorFields)
    }

    const food = await Food.create({ store_id: store._id, name, description, category, price})
    res.status(200).json(food)
}

const getFoodDetails = async (req, res) => {
    const { id } = req.params
    
    if(!isValidObjectId(id)) {
        return res.status(404).json({ error : "No such food product"})
    }

    const food = await Food.findById({ _id: id})

    if(!food) {
        return res.status(400).json({ error : "No such food product"})
    }

    res.status(200).json(food)
}

const updateFood = async (req, res) => {
    const { id } = req.params
    const updated = req.body

    if(!isValidObjectId(id)) {
        return res.status(404).json({ error : "No such food product"})
    }

    await Food.findByIdAndUpdate({ _id: id}, {...updated})
    const food = await Food.findById({ _id: id })

    if(!food) {
        return res.status(400).json({ error : "No such food product"})
    }

    res.status(200).json(food)
}

const deleteFood = async (req, res) => {
    const { id } = req.params
    
    if(!isValidObjectId(id)) {
        return res.status(404).json({ error : "No such food product"})
    }

    const food = await Food.findByIdAndDelete({ _id: id })

    if(!food) {
        return res.status(400).json({ error : "No such food product"})
    }

    res.status(200).json({message : 'Delete food'})
}

const getStoreFoods = async (req, res) => {
    const { id } = req.params

    if(!isValidObjectId(id)) {
        return res.status(404).json({ error : "No such store"})
    }

    const foods = await Food.find({ store_id: id })

    if(!foods) {
        return res.status(400).json({ error : "No such store"})
    }

    res.status(200).json(foods)
}


module.exports = { 
    getAllFoods, 
    storeFood, 
    getFoodDetails,
    updateFood,
    deleteFood,
    getStoreFoods
}