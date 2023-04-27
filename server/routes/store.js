const express = require('express')
const router = express.Router()
const { getAllStores, storeStore, getStoreDetails } = require('../controllers/storeController')

router.get('/api/stores', getAllStores)
router.post('/api/stores', storeStore)

router.get('/api/stores/:id', getStoreDetails)

module.exports = router