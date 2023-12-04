const fs = require('fs')

class UserServices{
    getUser(){
        return new Promise((res, rej) => {
            fs.readFile('users.json', 'utf8', (error, data) => {
                if(error){
                    rej(error)
                } else {
                    const obj = JSON.parse(data)
                    res(obj)
                }
            })
        })
    }

    createUser(newUser){
        return new Promise((res, rej) => {
            fs.readFile('users.json', 'utf8', (error, data) => {
                if(error){
                    rej(error)
                } else {
                    const obj = JSON.parse(data)
                    obj.push(newUser)
                    fs.writeFile('users.json', JSON.stringify(obj, null, 3), (error, data) => {
                        if(error){
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

module.exports = new UserServices()