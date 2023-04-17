const BusinessType = require('../models/businessTypeModel')

const storeType = async (req, res) => {
    const { name } = req.body

    if(!name){
        return res.status(400).json({ error: "Please fill in all fields."})
    }

    const type = await BusinessType.create({ name })
    res.status(200).json(type)
}

module.exports = {
    storeType
}