const mongoose = require('mongoose')
const { Schema, model } = mongoose;


const todoSchema = new Schema ({
    title: String,
    isCompleted: Boolean,
    userId: String
})

const User = mongoose.model('todos', todoSchema)

module.exports = User