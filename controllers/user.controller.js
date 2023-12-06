const UserServices = require('../services/user.service')
const Sentry = require('@sentry/node')
const { v4: uuid } = require('uuid')
const {validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


class UsersController{
    async getUser(req, res){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).send({errors: errors.array()})
            }
            const user = await UserServices.getUser()
            return res.send(user)
        } catch(error){
            Sentry.captureException(error)
        }
    }

    async findEmail(email) {
        try {
            const users = await UserServices.getUser();
            const isUsed = users.some(item => item.email === email);
            return isUsed;
        } catch (error) {
            Sentry.captureException(error);
        }
    }

    async createUser(req, res){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).send({ errors: errors.array() })
            }
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
            const newUser = await UserServices.createUser({id: uuid(), ...req.body, password: hashedPassword})
            return res.send(newUser).status(201)
        } catch(error){
            Sentry.captureException(error)
        }
    }

    async login(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).send({ errors: errors.array() })
            }
            const { email, password } = req.body;
            const users = await UserServices.getUser();
            const user = users.find(item => item.email === email)
            if (!user) {
                res.status(404).send({ message: 'Логин или пароль не совпадает' })
            }
            const validatePassword = await bcrypt.compare(password, user.password)
            if (!validatePassword) {
                res.status(403).send({ message: 'Логин или пароль не совпадает' });
            }
            const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY)
            res.status(200).send({ token: token });
        }
        catch (error) {
            Sentry.captureException(error)
        }
    }
}


module.exports = new UsersController