const express = require('express')
const router = express.Router()
const todoRourtes = require('./todo.routes')
const usersRoutes = require('./users.routes')


router.use('/todo', todoRourtes)
router.use('/users', usersRoutes)


module.exports = router