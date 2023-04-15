const express = require('express')
const router = express.Router()

const { 
    getAllTransactions, 
    storeTransaction, 
    getTransactionDetails 
} = require('../controllers/transactionController')

// AUTH MIDDLEWARE
const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth)

router.get('/api/transactions', getAllTransactions)
router.post('/api/transactions', storeTransaction)
router.get('/api/transactions/:id', getTransactionDetails)

module.exports = router