const express = require('express')
const router = express.Router()

const UserControllers = require('../controllers/user.controller')


const { body } = require('express-validator')

const validateBody = [
    body('email')
        .notEmpty().withMessage('Email не может быть пустым')
        .isEmail().withMessage('Не соответствует'),
    body('password') 
        .isLength({min: 5}).withMessage('Password минимум 5 символов')   
]

const validateEmail = [
    body('email')
        .custom(async email => {
            const isEmail = await UserControllers.findEmail(email)
            if(isEmail){
                throw new Error('email уже существует')
            }
        })
]

const validationNoEmail = [
    body('email')
        .custom(async email => {
            const isNoEmail = await UserControllers.findEmail(email);
            if (!isNoEmail) {
                throw new Error('Email не существует');
            }
        })
];

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Получить список всех users
 *     description: Получение списка users из базы данных.
 *     tags:
 *       - Users
 *     responses:
 *      200:
 *         description: Успешный запрос. Возвращает массив users
 *      500:
 *         description: Ошибка сервера. Не удалось получить список всех users
 */

router.get('/', UserControllers.getUser)

/**
 * @swagger
 * /api/users/create:
 *    post:
 *      summary: Создать нового пользователя
 *      description: Создание нового пользователя в системе
 *      tags:
 *        - Users
 *      requestBody:
 *        $ref: "#/components/requestBodies/Users"
 *      responses:
 *        200:
 *          description: Пользователь успешно создан
 * components:
 *   requestBodies:
 *     Users:
 *       description: Свойства пользователя, которые были добавлены.
 *       required: true
 *       content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: qwer@gmail.com
 *               password:
 *                 type: string
 *                 example: "111111" 
 *          400:
 *            description: Некорректный запрос. Проверьте параметры запроса
 *          500:
 *            description: Ошибка сервера. Не удалось создать пользователя
 *              
 */


router.post('/create', validateEmail, validateBody, UserControllers.createUser)

/**
 * @swagger
 * /api/users/login:
 *    post:
 *      summary: Логирование нового пользователя
 *      description: Логирование нового пользователя в системе
 *      tags:
 *        - Users
 *      requestBody:
 *        $ref: "#/components/requestBodies/Users"
 *      responses:
 *        200:
 *          description: Пользователь успешно залогирован
 * components:
 *   requestBodies:
 *     Users:
 *       description: Свойства пользователя, которые были добавлены.
 *       required: true
 *       content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: qwer@gmail.com
 *               password:
 *                 type: string
 *                 example: "111111" 
 *          400:
 *            description: Некорректный запрос. Проверьте параметры запроса
 *          500:
 *            description: Ошибка сервера. Не удалось создать пользователя
 *              
 */

router.post('/login', validationNoEmail, validateBody, UserControllers.login)



module.exports = router

