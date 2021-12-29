const express = require('express')
const router = express.Router()
const CommentController = require('../controller/commentController')

/* 
@Router GET api/comments/:postId
@des get all comment of post
@access public
*/
router.get('/:postId', CommentController.getComment)

/* 
@Router GET api/comments/:postId/:userId
@des post comment of post
@access user
*/
router.post('/:postId/:userId', CommentController.createComment)

/* 
@Router DELETE api/comments/delete/:postId/:userId
@des delete comment
@access user
*/
router.delete('/delete/:id/:postId', CommentController.deleteComment)

module.exports = router
