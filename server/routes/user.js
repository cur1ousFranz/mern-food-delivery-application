const express = require('express')
const router = express.Router()

const { loginUser, updateCustomerPassword } = require('../controllers/userController')

router.post('/api/users/login', loginUser)
router.put('/api/users/customer/:id/password', updateCustomerPassword)

module.exports = router