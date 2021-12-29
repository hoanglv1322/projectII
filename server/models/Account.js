const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AccountSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: 'string',
		required: true,
	},

	password: {
		type: 'string',
		required: true,
	},
	avatar: {
		type: String,
		default: '',
	},
	postCreates: [
		{
			type: Schema.Types.ObjectId,
			ref: 'posts',
		},
	],
	postLikeds: [
		{
			type: Schema.Types.ObjectId,
			ref: 'posts',
		},
	],
	friends: [
		{
			type: Schema.Types.ObjectId,
			ref: 'accounts',
		},
	],
	createDate: {
		type: Date,
		default: Date.now(),
	},
	role: {
		type: String,
		default: 'user', // admin
	},
})

module.exports = mongoose.model('accounts', AccountSchema)
