const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = mongoose.Schema({
	postId: {
		type: Schema.Types.ObjectId,
		ref: 'posts',
		require: true,
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'accounts',
		require: true,
	},
	user_reply: {
		type: Schema.Types.ObjectId,
		ref: 'accounts',
	},
	commentText: {
		type: String,
		require: true,
	},
	likeComment: {
		status: Boolean,
		userLikes: [{ type: Schema.Types.ObjectId, ref: 'accounts' }],
	},
	dateCreated: {
		type: Date,
		default: Date.now(),
	},
})

module.exports = mongoose.model('comments', CommentSchema)
