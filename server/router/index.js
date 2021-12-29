const authRouter = require('./authRouter')
const postRouter = require('./postRouter')
const commentRouter = require('./commentRouter')
const userRouter = require('./userRouter')

function router(app) {
	app.use('/api/auth', authRouter)
	app.use('/api/posts', postRouter)
	app.use('/api/comments', commentRouter)
	app.use('/api/user', userRouter)
}

module.exports = router
