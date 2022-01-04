const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const validatorInfor = require('../util/validatorInfor')

/* 
@Router PUT api/user/update
@des  update infor user
@access user
*/
router.put('/update/:userId', userController.updateUser)

/* 
@Router get api/user/:userId
@des  update infor user
@access user
*/
router.get('/:userId', userController.getUser)

module.exports = router
