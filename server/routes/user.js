const express = require('express')
const router = express.Router()

const { loginUser } = require('../controllers/userController')

router.post('/api/users/login', loginUser)

module.exports = router