const express = require('express')
const router = express.Router()
const { 
    getAllCustomers, 
    storeCustomer,
    getCustomerDetails ,
    updateCustomer
} = require('../controllers/customerController')

// AUTH MIDDLEWARE
const requireAuth = require('../middleware/requireAuth')

router.post('/api/customers', storeCustomer)

router.use(requireAuth)
router.get('/api/customers', getAllCustomers)
router.put('/api/customers/:id', updateCustomer)
router.get('/api/customers/:id', getCustomerDetails)

module.exports = router