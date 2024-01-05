const mongoose = require('mongoose')



async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING)
        console.log('Успешное соединение с MongoDb')
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDb