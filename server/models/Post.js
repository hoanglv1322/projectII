const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = mongoose.Schema({
	author: {
		type: Schema.Types.ObjectId,
		ref: 'accounts',
	},
	titlePost: {
		type: String,
		required: true,
	},
	typePost: {
		type: String,
		required: true,
	},
	descPost: {
		type: String,
		required: true,
	},
	file: {
		type: String,
	},
	sumLike: {
		type: Number,
		default: 0,
	},
	userLikePost: [{ type: Schema.Types.ObjectId, ref: 'accounts' }],
	dateCreated: {
		type: Date,
		default: Date.now(),
	},
})

module.exports = mongoose.model('posts', PostSchema)
