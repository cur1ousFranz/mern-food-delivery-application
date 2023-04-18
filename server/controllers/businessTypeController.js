const BusinessType = require('../models/businessTypeModel')

const getAllBusinessType = async (req, res) => {
    const businessTypes = await BusinessType.find() 
    res.status(200).json(businessTypes)
}

const storeBusinessType = async (req, res) => {
    const { name } = req.body

    if(!name){
        return res.status(400).json({ error: "Please fill in all fields."})
    }

    const type = await BusinessType.create({ name })
    res.status(200).json(type)
}

module.exports = {
    storeBusinessType,
    getAllBusinessType
}