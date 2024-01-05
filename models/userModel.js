const mongoose = require('mongoose')
const { Schema, model } = mongoose;
// const Schema = mongoose.Schema;

const userSchema = new Schema ({
    email: String,
    password: String
})

const User = mongoose.model('users', userSchema)

module.exports = User