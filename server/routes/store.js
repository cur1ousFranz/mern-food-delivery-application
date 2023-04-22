const express = require('express')
const router = express.Router()
const { getAllStores, storeStore, getStoreDetails } = require('../controllers/storeController')
const requireAuth = require('../middleware/requireAuth')

router.get('/api/stores', getAllStores)
router.post('/api/stores', storeStore)

// AUTH MIDDLEWARE
router.use(requireAuth)

router.get('/api/stores/:id', getStoreDetails)

module.exports = router