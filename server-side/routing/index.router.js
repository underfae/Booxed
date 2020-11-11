const express = require('express')
const userController = require('../controllers/user.controller')
const tokenHelper = require('../config/jwt.helper')

const router = express.Router()

router.post('/register', userController.registerUser)
router.post('/authenticate', userController.authentication)
router.get('/loggedUser', tokenHelper.jwtVerification, userController.loggedUser)

module.exports = router