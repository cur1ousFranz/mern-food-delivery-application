const express = require('express')
const router = express.Router()

const { 
    getAllOrders, 
    storeOrder, 
    getOrderDetails 
} = require('../controllers/orderController')

// AUTH MIDDLEWARE
const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth)

router.get('/api/orders', getAllOrders)
router.post('/api/orders', storeOrder)
router.get('/api/orders/:id', getOrderDetails)

module.exports = router