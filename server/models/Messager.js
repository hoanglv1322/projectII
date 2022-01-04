const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema(
	{
		conversationId: {
			type: String,
		},
		sender: {
			type: Schema.Types.ObjectId,
			ref: 'accounts',
		},
		text: {
			type: String,
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('messagers', MessageSchema)
