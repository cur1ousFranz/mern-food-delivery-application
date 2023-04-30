const express = require('express')
const router = express.Router()
const {
    getAllStores,
    storeStore,
    getStoreDetails,
    updateStore,
    updateStoreImage
} = require('../controllers/storeController')

router.get('/api/stores', getAllStores)
router.post('/api/stores', storeStore)

router.get('/api/stores/:id', getStoreDetails)
router.put('/api/stores/:id', updateStore)
router.put('/api/stores/:id/image', updateStoreImage)

module.exports = router