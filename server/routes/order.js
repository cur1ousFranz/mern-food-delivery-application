const express = require('express')
const router = express.Router()

const { 
    getAllOrders, 
    storeOrder, 
    getOrderDetails,
    getAllStoreOrders
} = require('../controllers/orderController')

// AUTH MIDDLEWARE
const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth)

router.get('/api/orders', getAllOrders)
router.post('/api/orders', storeOrder)
router.get('/api/orders/:id', getOrderDetails)
router.get('/api/orders/store/:id', getAllStoreOrders)

module.exports = router