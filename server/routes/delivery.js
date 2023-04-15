const express = require('express')
const router = express.Router()

const { 
    storeDelivery, 
    getAllDeliveries, 
    getDeliveryDetails 
} = require('../controllers/deliveryController')

// AUTH MIDDLEWARE
const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth)

router.get('/api/deliveries', getAllDeliveries)
router.post('/api/deliveries', storeDelivery)
router.get('/api/deliveries/:id', getDeliveryDetails)

module.exports = router