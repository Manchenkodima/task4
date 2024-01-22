const TodoService = require('../services/todo.service.js')
const Sentry = require('@sentry/node');
const {validationResult} = require('express-validator')
const { v4: uuid } = require('uuid')


class todoControllers {
    async getTodo(req, res){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
            res.status(400).send({errors: errors.array()})
            }
            const todo = await TodoService.getTodo(req.userId)
            res.status(200).send(todo)
        } catch(error){
            Sentry.captureException(error)
        }
    }

    async createTodo(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).send({ errors: errors.array() })
            }
            const { title } = req.body;
            const newTodo = {
                id: uuid(),
                title: title,
                isCompleted: false,
                userId: req.userId
            }
            // id: uuid(), ...req.body 
            await TodoService.createTodo(newTodo)
            res.status(200).send(newTodo)
        } catch (error) {
            Sentry.captureException(error)
        }
    }

    async editTodoTitle(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).send({ errors: errors.array() })
            }
            const userId = req.userId
            const id = req.params.id;
            console.log(id)
            const title = req.body.title
            console.log(title)
            console.log(userId)
            const newTodo = await TodoService.editTodoTitleById(id, title, userId)
            return res.status(200).send(newTodo)
        } catch (error) {
            Sentry.captureException(error)
        }
    }

    async editTodoIsCompleted(req, res) {
        
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).send({ errors: errors.array() })
            }
            const userId = req.userId
            const id = req.params.id
            const todo = await TodoService.getOneTodo(id, userId)
            if(!todo){
                return res.status(400).send('Таска не найдена')
            }
            const newStatus = !todo.isCompleted

            const newTodo = await TodoService.editTodoIsCompleted(id, userId, newStatus)
            return res.status(200).send(newTodo)
        } catch (error) {
            Sentry.captureException(error)
        }
    }

    async deleteTodo(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).send({ errors: errors.array() })
            }
            const id = req.params.id
            const deleteTodoId = await TodoService.deleteTodoById(id, req.userId)
            return res.status(200).send(deleteTodoId)
        } catch (error) {
            Sentry.captureException(error)
        }
    }
}
module.exports = new todoControllers()