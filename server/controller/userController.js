const Account = require('../models/Account')

class UserController {
	updateUser = async (req, res) => {
		try {
			const { userId, username, email, avatar, password } = req.body
			let update_User = {
				username,
				email,
				avatar,
				password,
			}
			const updatedUser = await Account.findByIdAndUpdate(
				{ _id: userId },
				update_User,
				{ new: true }
			)
			res.status(200).json({
				success: true,
				updatedUser,
			})
		} catch (err) {
			res.status(500).json(err)
		}
	}

	getUser = async (req, res) => {
		try {
			const user = await Account.findOne({ _id: req.params.userId })
			if (user) {
				res.status(200).json({
					success: true,
					user,
				})
			}
		} catch (error) {
			res.status(500).json(err)
		}
	}
}

module.exports = new UserController()
