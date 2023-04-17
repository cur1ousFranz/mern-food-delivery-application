const express = require('express')
const { storeType } = require('../controllers/businessTypeController')
const router = express.Router()

router.post('/api/business-type', storeType)

module.exports = router