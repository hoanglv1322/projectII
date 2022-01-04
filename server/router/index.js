const authRouter = require('./authRouter')
const postRouter = require('./postRouter')
const commentRouter = require('./commentRouter')
const userRouter = require('./userRouter')
const conversationRoute = require('./conversationRouter')
const messageRoute = require('./messagerRouter')

function router(app) {
	app.use('/api/auth', authRouter)
	app.use('/api/posts', postRouter)
	app.use('/api/comments', commentRouter)
	app.use('/api/user', userRouter)
	app.use('/api/conversations', conversationRoute)
	app.use('/api/messages', messageRoute)
}

module.exports = router
