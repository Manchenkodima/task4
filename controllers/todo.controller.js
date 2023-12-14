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
            const todo = await TodoService.getTodo()
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
            await TodoService.createTodo({ id: uuid(), ...req.body })
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
            const id = req.params.id;
            console.log(id)
            const title = req.body.title
            const newTodo = await TodoService.editTodoTitle(id, title)
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
            const id = req.params.id
            const newTodo = await TodoService.editTodoIsCompleted(id)
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
            const deleteTodoId = await TodoService.deleteTodo(id)
            return res.send(deleteTodoId)
        } catch (error) {
            Sentry.captureException(error)
        }
    }
}
module.exports = new todoControllers()