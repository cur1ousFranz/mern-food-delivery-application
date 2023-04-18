const express = require('express')
const { getAllBusinessType, storeBusinessType } = require('../controllers/businessTypeController')
const router = express.Router()

router.get('/api/business-type', getAllBusinessType)
router.post('/api/business-type', storeBusinessType)

module.exports = router