const { rejects } = require('assert')
const fs = require('fs')
const { resolve } = require('path')
const { title } = require('process')
const User = require('../models/todoModel')
const { isCancel } = require('axios')

class TodoService {
    // getTodo(){
    //     return new Promise((res, rej) => {
    //         fs.readFile('data.json', 'utf8', (error, data) => {
    //             if(error) {
    //                 rej(error)
    //             } else {
    //                 const obj = JSON.parse(data)
    //                 res(obj)
    //             }
    //         })
    //     })
    // }

  
    
    async getTodo(data) {
        const todo = await User.find({userId: data})
        return todo
    }
    async getOneTodo(id, userId) {
        const todo = await User.findOne({_id:id, userId:userId})
        return todo
    }
    // createTodo(newTodo){
    //     return new Promise((res, rej) => {
    //         fs.readFile('data.json', 'utf8', (error, data) => {
    //             if (error){
    //                 rej(error)
    //             } else {
    //                 const obj = JSON.parse(data)
    //                 obj.push(newTodo)
    //                 fs.writeFile('data.json', JSON.stringify(obj, null, 3), (err) => {
    //                     if (err) {
    //                         rej(err)
    //                     } else {
    //                         res(obj)
    //                     }
    //                 })
    //             }
    //         })
    //     })
    // }

    async createTodo(todo) {
        const newTodo = new User(todo);
        newTodo.save();
        return newTodo;
    }

    async editTodoTitleById(id, newTitle, userId) {
        try {
            console.log(newTitle)
            const todo = await User.findOneAndUpdate({_id:id, userId:userId}, {title: newTitle }, {new:true})
            console.log(todo)
            return todo
        }
        catch (error) {
            return 'error'
        }
    }

    // editTodoTitle(id, title) {
    //     return new Promise((res, rej) => {
    //         fs.readFile('data.json', 'utf8', (error, data) => {
    //             if (error) {
    //                 rej(error)
    //             } else {
    //                 const obj = JSON.parse(data)
    //                 const index = obj.findIndex(item => item.id === id)
    //                 if (index === -1) {
    //                     rej('Не существует')
    //                 } else {
    //                     const updateTodo = { ...obj[index], title }
    //                     obj[index] = updateTodo
    //                     fs.writeFile('data.json', JSON.stringify(obj, null, 3), 'utf8', err => {
    //                         if (err) {
    //                             rej(err)
    //                         } else {
    //                             res(obj)
    //                         }
    //                     })
    //                 }
    //             }
    //         })
    //     })
    // }
    async editTodoIsCompleted(id, userId, newStatus) {
        try {
            const todo = await User.findOneAndUpdate({_id:id, userId:userId}, {isCompleted: newStatus}, {new:true})
            console.log(todo)
            return todo
        }
        catch (error) {
            return 'error'
        }
    }
    // editTodoIsCompleted(id){
    //     return new Promise((res, rej) => {
    //         fs.readFile('data.json', 'utf8', (error, data) => {
    //             if(error){
    //                 rej(error)
    //             }else {
    //                 const obj = JSON.parse(data)
    //                 const index = obj.findIndex(item => item.id === id)
    //                 if (index === -1) {
    //                     rej('Не существует')
    //                 } else {
    //                     const updateTodo = {...obj[index]}
    //                     updateTodo.isCompleted = !updateTodo.isCompleted
    //                     obj[index] = updateTodo
    //                     fs.writeFile('data.json', JSON.stringify(obj, null, 3), 'utf8', err => {
    //                         if (err) {
    //                             rej(err)
    //                         } else {
    //                             res(obj)
    //                         }
    //                     })
    //                 }
    //             }
    //         })
    //     })
    // }

    // deleteTodo(id) {
    //     return new Promise((res, rej) => {
    //         fs.readFile('data.json', 'utf8', (error, data) => {
    //             if (error) {
    //                 rej(error)
    //             } else {
    //                 const obj = JSON.parse(data)
    //                 const index = obj.findIndex(item => item.id === id)
    //                 obj.splice(index, 1)
    //                 fs.writeFile('data.json', JSON.stringify(obj, null, 3), 'utf8', error => {
    //                     if (error) {
    //                         rej(error)
    //                     } else {
    //                         res(obj)
    //                     }
    //                 })
    //             }
    //         })
    //     })
    // }
    async deleteTodoById(id, data){
        try {
            const todo = await User.deleteOne({ _id: id, userId: data })
            return todo
        }
        catch (error) {
            return 'error'
        }
    }
}





module.exports = new TodoService();