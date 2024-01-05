// const fs = require('fs')

// class UserServices{
//     getUser(){
//         return new Promise((res, rej) => {
//             fs.readFile('users.json', 'utf8', (error, data) => {
//                 if(error){
//                     rej(error)
//                 } else {
//                     const obj = JSON.parse(data)
//                     res(obj)
//                 }
//             })
//         })
//     }

//     createUser(newUser){
//         return new Promise((res, rej) => {
//             fs.readFile('users.json', 'utf8', (error, data) => {
//                 if(error){
//                     rej(error)
//                 } else {
//                     const obj = JSON.parse(data)
//                     obj.push(newUser)
//                     fs.writeFile('users.json', JSON.stringify(obj, null, 3), (error, data) => {
//                         if(error){
//                             rej(error)
//                         } else {
//                             res(obj)
//                         }
//                     })
//                 }
//             })
//         })
//     }

// }

// module.exports = new UserServices()

const User = require('../models/userModel')

class UsersServices {
    async getUser() {
        const users = await User.find({})
        return users
    }

async getUserByEmail(email){
    const user = await User.findOne({email})
    return user
}
//   async getUser (userId) {
//     const connection = await getConnection()
//     const db = useDefaultDb(connection)
//     const [data] = await db
//       .collection(this.#COLLECTION)
//       .aggregate([{ $match: { userId } }])
//       .toArray()
//     connection.close()
//     return data
//   }

async createUser(user) {
    const newUser = new User(user);
    newUser.save();
    return newUser;
}

async deleteUserById(id){
    const user = await User.deleteOne({id})
    return user
}

//   async delete (userId) {
//     const connection = await getConnection()
//     const db = useDefaultDb(connection)
//     await db.collection(this.#COLLECTION).remove({ _id: userId })
//     connection.close()
//   }
}

module.exports = new UsersServices()