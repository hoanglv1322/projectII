const express = require('express')
const router = express.Router()
const authController = require('../controller/authController')
const validatorRegister = require('../util/validator')
const verifyToken = require('../util/verifyToken')

// @route GET api/auth
// @desc Check if user is logged in
// @access Public
router.get('/', verifyToken, authController.checkAuth)

/* 
@Router POST api/auth/register 
@des register users
@access Public
*/
router.post('/register', validatorRegister, authController.register)
/* 
@Router POST api/auth/login
@des login users
@access Public
*/
router.post('/login', authController.login)

module.exports = router
