const express = require('express')
const router = express.Router()

const { getAllOrders, storeOrder, getOrderDetails } = require('../controllers/orderController')

router.get('/api/orders', getAllOrders)
router.post('/api/orders', storeOrder)
router.get('/api/orders/1', getOrderDetails)

module.exports = router