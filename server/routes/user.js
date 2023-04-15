const express = require('express')
const router = express.Router()

const { signupUser, loginUser } = require('../controllers/userController')

router.post('/api/users/signup', signupUser)
router.post('/api/users/login', loginUser)

module.exports = router