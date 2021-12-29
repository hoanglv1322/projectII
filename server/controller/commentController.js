const Comment = require('../models/Comment')

class CommentController {
	createComment = async (req, res) => {
		const postId = req.params.postId
		const userId = req.params.userId
		const { commentText } = req.body

		try {
			const comment = new Comment({
				postId,
				userId,
				commentText,
			})
			await comment.save()
			return res.json({
				success: true,
				message: 'Happy processs',
				comment,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'Internal Server Error',
			})
		}
	}

	getComment = async (req, res) => {
		try {
			const postId = req.params.postId
			const comments = await Comment.find({ postId }).populate('userId', [
				'avatar',
			])
			res.json({
				success: true,
				comments,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'Internal Server Error',
			})
		}
	}

	deleteComment = async (req, res) => {
		try {
			const deleteCommentConditions = {
				_id: req.params.id,
				postId: req.params.postId,
			}
			const delete_Comment = await Comment.findOneAndDelete(
				deleteCommentConditions
			)

			//user not authorized or post not found
			if (!delete_Comment) {
				return res.json({
					success: false,
					message: 'User not authorized or post not found',
				})
			}

			res.json({
				success: true,
				message: 'Delete comment succes!!!!',
				delete_Comment,
			})
		} catch (e) {
			res.status(500).json({
				success: false,
				message: 'Internal Server Error',
			})
		}
	}
}

module.exports = new CommentController()
