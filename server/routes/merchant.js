const express = require('express')
const router = express.Router()
const { getAllMerchants, storeMerchant } = require('../controllers/merchantController')

router.get('/api/merchants', getAllMerchants)
router.post('/api/merchants', storeMerchant)

module.exports = router