const express = require('express')
const router = express.Router()
const postController = require('../controller/postController')
const verifyToken = require('../util/verifyToken')

/* 
@Router GET api/post/ 
@des get all post
@access public
*/
router.get('/', postController.getAllPost)

/* 
@Router GET api/post/ :id
@des get all post
@access public
*/
router.get('/:id', postController.getDetailPost)

/* 
@Router GET api/post/author 
@des get post
@access user
*/
router.get('/author', verifyToken, postController.getPost)

/* 
@Router POST api/post/create 
@des create post
@access user
*/
router.post('/create', verifyToken, postController.create)

/* 
@Router PUT api/post/update/:id
@des create post
@access user
*/
router.put('/update/:id', verifyToken, postController.updatePost)

/* 
@Router PUT api/post/updateStatus/:id
@des update status post
@access user
*/
router.put('/updateStatus/:id', verifyToken, postController.updateStatusPost)

/* 
@Router PUT api/post/updateStatus/:id
@des delete status post
@access user
*/
router.put('/deleteStatus/:id', verifyToken, postController.deleteStatusPost)

/* 
@Router DELETE api/post/delete/:id
@des create post
@access user
*/
router.delete('/delete/:id', verifyToken, postController.deletePost)

module.exports = router
