const { isValidObjectId } = require('mongoose')
const Food = require('../models/foodModel')

const getAllFoods = async (req, res) => {
    const foods = await Food.find()

    res.status(200).json(foods)
}

const storeFood = async (req, res) => {
    const { name, description, price} = req.body
    const errorFields = { error : "Pleae fill in all fields"}
    
    if(!name) {
        return res.status(400).json(errorFields)
    }
    if(!description) {
        return res.status(400).json(errorFields)
    }
    if(!price) {
        return res.status(400).json(errorFields)
    }

    const food = await Food.create({ name, description, price})
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


module.exports = { 
    getAllFoods, 
    storeFood, 
    getFoodDetails,
    updateFood,
    deleteFood
}