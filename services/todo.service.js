const { rejects } = require('assert')
const fs = require('fs')
const { resolve } = require('path')
const { title } = require('process')

class TodoService {
    getTodo(){
        return new Promise((res, rej) => {
            fs.readFile('data.json', 'utf8', (error, data) => {
                if(error) {
                    rej(error)
                } else {
                    const obj = JSON.parse(data)
                    res(obj)
                }
            })
        })
    }
    createTodo(newTodo){
        return new Promise((res, rej) => {
            fs.readFile('data.json', 'utf8', (error, data) => {
                if (error){
                    rej(error)
                } else {
                    const obj = JSON.parse(data)
                    obj.push(newTodo)
                    fs.writeFile('data.json', JSON.stringify(obj, null, 3), (err) => {
                        if (err) {
                            rej(err)
                        } else {
                            res(obj)
                        }
                    })
                }
            })
        })
    }

    editTodoTitle(id, title) {
        return new Promise((res, rej) => {
            fs.readFile('data.json', 'utf8', (error, data) => {
                if (error) {
                    rej(error)
                } else {
                    const obj = JSON.parse(data)
                    const index = obj.findIndex(item => item.id === id)
                    if (index === -1) {
                        rej('Не существует')
                    } else {
                        const updateTodo = { ...obj[index], title }
                        obj[index] = updateTodo
                        fs.writeFile('data.json', JSON.stringify(obj, null, 3), 'utf8', err => {
                            if (err) {
                                rej(err)
                            } else {
                                res(obj)
                            }
                        })
                    }
                }
            })
        })
    }

    editTodoIsCompleted(id){
        return new Promise((res, rej) => {
            fs.readFile('data.json', 'utf8', (error, data) => {
                if(error){
                    rej(error)
                }else {
                    const obj = JSON.parse(data)
                    const index = obj.findIndex(item => item.id === id)
                    if (index === -1) {
                        rej('Не существует')
                    } else {
                        const updateTodo = {...obj[index]}
                        updateTodo.isCompleted = !updateTodo.isCompleted
                        obj[index] = updateTodo
                        fs.writeFile('data.json', JSON.stringify(obj, null, 3), 'utf8', err => {
                            if (err) {
                                rej(err)
                            } else {
                                res(obj)
                            }
                        })
                    }
                }
            })
        })
    }

    deleteTodo(id) {
        return new Promise((res, rej) => {
            fs.readFile('data.json', 'utf8', (error, data) => {
                if (error) {
                    rej(error)
                } else {
                    const obj = JSON.parse(data)
                    const index = obj.findIndex(item => item.id === id)
                    obj.splice(index, 1)
                    fs.writeFile('data.json', JSON.stringify(obj, null, 3), 'utf8', error => {
                        if (error) {
                            rej(error)
                        } else {
                            res(obj)
                        }
                    })
                }
            })
        })
    }
}





module.exports = new TodoService();