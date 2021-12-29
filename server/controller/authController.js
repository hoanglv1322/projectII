const Account = require('../models/Account')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendMail = require('../config/SendEmail')
const { restart } = require('nodemon')

const CLIENT_URL = `${process.env.BASE_URL}`

class AuthController {
	checkAuth = async (req, res) => {
		try {
			const user = await Account.findById(req.userId).select('-password')
			if (!user) {
				return res.status(400).json({
					success: false,
					message: 'User not found in database',
				})
			}
			res.status(200).json({ success: true, user })
		} catch (error) {
			console.log(error)
			res.status(500).json({
				success: false,
				message: 'Internal server error',
			})
		}
	}

	//register account
	register = async (req, res) => {
		const { username, email, password } = req.body
		try {
			//email exits in database
			const account = await Account.findOne({ email })

			if (account) {
				return res.status(400).json({
					success: false,
					message: ['email already exits'],
				})
			}

			//all good
			//hash password
			const salt = await bcrypt.genSalt(10)
			const hashPassword = await bcrypt.hash(password, salt)
			const newAccount = await Account({
				username,
				email,
				password: hashPassword,
			})
			await newAccount.save()

			//return token
			const accessToken = await jwt.sign(
				{ userID: newAccount._id },
				process.env.ACCESS_TOKEN_SECRET
			)

			const url = `${CLIENT_URL}`
			sendMail(email, url, 'Verify your email address')
			res.status(200).json({
				success: 'true',
				message: [
					'Register account success!!!',
					'Please verify your email address!!!',
				],
			})
		} catch (err) {
			restart.json.status(500)({ success: false, message: [err.message] })
		}
	}

	//login with email and password
	login = async (req, res) => {
		const { email, password } = req.body

		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: 'Invalid email or password',
			})
		}

		try {
			const user = await Account.findOne({ email })
			if (!user) {
				return res.status(400).json({
					success: false,
					message: 'Invalid email or password',
				})
			}

			//user founded
			if (!bcrypt.compare(password, user.password)) {
				return res.status(400).json({
					success: false,
					message: 'Invalid email or password ',
				})
			}

			//return token
			const accessToken = await jwt.sign(
				{ userID: user._id },
				process.env.ACCESS_TOKEN_SECRET
			)

			res.status(200).json({
				success: true,
				accessToken,
			})
		} catch (err) {
			res.status(500).json({
				success: false,
				message: 'Internal server error',
			})
		}
	}

	//get all account
	getAllAccounts = async (req, res) => {
		try {
			const allAccounts = await Account.find()
			if (allAccounts) {
				res.status(200).json({
					success: true,
					allAccounts,
				})
			}
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'Internal server error',
			})
		}
	}

	//add friend
	addFriend = async (req, res) => {
		const friendId = req.params.friendId
		try {
			const user = await Account.findOneAndUpdate(
				{ _id: req.userId },
				{
					$addToSet: {
						friends: friendId,
					},
				},
				{ new: true }
			)
			if (user) {
				res.status(200).json({ success: true, user })
			}
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'Internal server error',
			})
		}
	}

	//delete friend
	deleteFriend = async (req, res) => {
		const friendId = req.params.friendId
		try {
			const user = await Account.findOneAndUpdate(
				{ _id: req.userId },
				{
					$pull: {
						friends: friendId,
					},
				},
				{ new: true }
			)
			if (user) {
				res.status(200).json({ success: true, user })
			}
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'Internal server error',
			})
		}
	}

	logout = async (req, res) => {}
}

module.exports = new AuthController()
