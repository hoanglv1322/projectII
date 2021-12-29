const express = require('express')
const router = express.Router()
const authController = require('../controller/authController')
const validatorRegister = require('../util/validator')
const verifyToken = require('../util/verifyToken')

// @route GET api/auth
// @desc Check if user is logged in
// @access Public
router.get('/', verifyToken, authController.checkAuth)

// @route GET api/auth/allAccounts
// @desc get all accounts
// @access Public
router.get('/allAccounts', verifyToken, authController.getAllAccounts)

/* 
@Router PUTT api/auth/addfriend/:friendId
@des add friend
@access user
*/
router.put('/addfriend/:friendId', verifyToken, authController.addFriend)

/* 
@Router PUT api/auth/deletefriend 
@des add friend
@access user
*/
router.put('/deletefriend/:friendId', verifyToken, authController.deleteFriend)

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
