require('dotenv').config()
const express = require('express')
const app = express()
const connectDB = require('./config/ConnectionDB')
const router = require('./router/index')
const multer = require('multer')
const cors = require('cors')
const path = require('path')

app.use(express.json())
app.use('/images', express.static(path.join(__dirname, '/images')))
app.use(cors())

//use mideware to format body in post
app.use(
	express.urlencoded({
		extended: true,
	})
)

//connect to mongoDb
connectDB()

//upload files
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'images')
	},
	filename: (req, file, cb) => {
		cb(null, req.body.name)
	},
})

const upload = multer({ storage: storage })
app.post('/api/upload', upload.single('file'), (req, res) => {
	res.status(200).json('File has been uploaded')
})

router(app)

app.get('/', (req, res) => res.send('Wellcome to may app blog'))

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
