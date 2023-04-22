const express = require('express')
const router = express.Router()

const {
    getAllFoods,
    storeFood,
    getFoodDetails,
    updateFood,
    deleteFood,
    getStoreFoods
} = require('../controllers/foodController')

router.get('/api/foods', getAllFoods)
router.post('/api/foods', storeFood)
router.get('/api/foods/:id', getFoodDetails)
router.put('/api/foods/:id', updateFood)
router.delete('/api/foods/:id', deleteFood)

router.get('/api/foods/store/:id', getStoreFoods)

module.exports = router