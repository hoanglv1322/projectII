const Posts = require('../models/Post')
const Account = require('../models/Account')

class PostController {
	create = async (req, res) => {
		const { titlePost, typePost, file, descPost } = req.body

		if (!titlePost || !typePost || !descPost) {
			return res.status(400).json({
				success: false,
				message: 'Invalid information post',
			})
		}

		try {
			const post = new Posts({
				author: req.userId,
				titlePost,
				typePost,
				descPost,
				file,
			})

			await post.save()
			return res.json({
				success: true,
				message: 'Happy processs',
				post,
			})
		} catch (e) {
			res.status(500).json({
				success: false,
				message: 'Internal Server Error',
			})
		}
	}

	getDetailPost = async (req, res) => {
		try {
			const post = await Posts.findById(req.params.id).populate(
				'author',
				['username']
			)
			res.json({
				success: true,
				post,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'Internal Server Error',
			})
		}
	}

	getAllPost = async (req, res) => {
		try {
			const posts = await Posts.find().populate('author', ['username'])
			res.json({
				success: true,
				posts,
			})
			console.log(posts)
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'Internal Server Error',
			})
		}
	}

	getPost = async (req, res) => {
		try {
			const posts = await Posts.find({ author: req.userId }).populate(
				'author',
				['email']
			)
			res.json({
				success: true,
				message: 'Happy processs',
				posts,
			})
		} catch (e) {
			res.status(500).json({
				success: false,
				message: 'Internal Server Error',
			})
		}
	}

	updatePost = async (req, res) => {
		const { titlePost, typePost, file, descPost } = req.body

		if (!titlePost || !typePost || !descPost) {
			return res.json({
				success: false,
				message: 'Invalid information post',
			})
		}

		try {
			let update_Post = {
				author: req.userId,
				titlePost,
				typePost,
				file,
				descPost,
			}

			const updatePostConditions = {
				_id: req.params.id,
				author: req.userId,
			}

			update_Post = await Posts.findByIdAndUpdate(
				updatePostConditions,
				update_Post,
				{ new: true }
			)

			if (!update_Post)
				return res.json({
					success: false,
					message: 'Post not found or user not authorised',
				})

			res.json({
				success: true,
				message: 'Excellent progress!',
				post: update_Post,
			})
		} catch (e) {
			res.status(500).json({
				success: false,
				message: 'Internal Server Error',
			})
		}
	}

	deletePost = async (req, res) => {
		try {
			const deletePostConditions = {
				_id: req.params.id,
				author: req.userId,
			}
			const delete_Post = await Posts.findOneAndDelete(
				deletePostConditions
			)

			//user not authorized or post not found
			if (!delete_Post) {
				return res.json({
					success: false,
					message: 'User not authorized or post not found',
				})
			}

			res.json({
				success: true,
				message: 'Delete post succes!!!!',
				delete_Post,
			})
		} catch (e) {
			res.status(500).json({
				success: false,
				message: 'Internal Server Error',
			})
		}
	}

	updateStatusPost = async (req, res) => {
		const { sumLike } = req.body
		const postId = req.params.id
		const userId = req.userId
		try {
			const updatePost = await Posts.findOneAndUpdate(
				{ _id: postId },
				{
					$set: {
						sumLike,
					},
					$addToSet: {
						userLikePost: userId,
					},
				},
				{
					new: true,
				}
			)
			if (!updatePost)
				return res.json({
					success: false,
					message: 'Post not found or user not authorised',
				})
			try {
				if (updatePost.author != userId) {
					const postLikeOfuser = await Account.findOneAndUpdate(
						{ _id: userId },
						{
							$addToSet: {
								postLikeds: postId,
							},
						},
						{ new: true }
					)
				}

				res.json({
					success: true,
					message: 'Excellent progress!',
					post: updatePost,
				})
			} catch (error) {}
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'Internal Server Error',
			})
		}
	}

	deleteStatusPost = async (req, res) => {
		const { sumLike } = req.body
		const postId = req.params.id
		const userId = req.userId
		try {
			const updatePost = await Posts.findOneAndUpdate(
				{ _id: postId },
				{
					$set: {
						sumLike,
					},
					$pull: {
						userLikePost: userId,
					},
				},
				{
					new: true,
				}
			)
			if (!updatePost)
				return res.json({
					success: false,
					message: 'Post not found or user not authorised',
				})
			try {
				const postLikeOfuser = await Account.findOneAndUpdate(
					{ _id: userId },
					{
						$pull: {
							postLikeds: postId,
						},
					},
					{ new: true }
				)
				if (postLikeOfuser) {
					res.json({
						success: true,
						message: 'Excellent progress!',
						post: updatePost,
					})
				}
			} catch (error) {}
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'Internal Server Error',
			})
		}
	}
}

module.exports = new PostController()
