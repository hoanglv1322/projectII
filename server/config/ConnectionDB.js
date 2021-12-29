const mongoose = require('mongoose')

const connectionDB = async() =>{

    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USENAME}:${process.env.DB_PASSWORD}@blog-app.1jdwk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
        console.log('MonggoDB connected!')
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

module.exports = connectionDB