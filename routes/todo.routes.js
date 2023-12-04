const express = require('express')
const router = express.Router()

const TodoControllers = require('../controllers/todo.controller')
const { body, param } = require('express-validator');
const authenticateToken = require('../middleware/authenticateToken')

const validateTodoBody = [
    body('title')
        .notEmpty().withMessage('title не может быть пустым')
        .isString().withMessage('title только строковый формат')
        .isLength({ min: 3 }).withMessage("title должен содержать не менее 3 символов"),
    body('id').isString().withMessage('ID не совпадает'),
    body('isCompleted').isBoolean().withMessage('isCompleted только булевое значение'),
    body('idUser').isString().withMessage('idUser только строковый формат')
]

const validateTodoId = param("id").isString().withMessage("Такого ID не существует");


    /**
 * @swagger
 * /api/todo:
 *   get:
 *     summary: Получить список всех тасок
 *     description: Получение списка тасок из базы данных.
 *     tags:
 *       - Todos
 *     security:
 *         - bearerAuth: []
 *     responses:
 *      200:
 *         description: Успешный запрос. Возвращает массив тасок
 *      500:
 *         description: Ошибка сервера. Не удалось получить список всех тасок
 * components:
 *   schemas:
 *     Todo:
 *       type: array
 *       properties:
 *         title:
 *           type: string
 *         isActive:
 *           type: boolean
 *           example: false
 */

router.get('/', authenticateToken, TodoControllers.getTodo)

/**
 * @swagger
 * /api/todo/create:
 *    post:
 *      summary: Создать новую таску
 *      description: Создание новой таски в системе
 *      tags:
 *        - Todos
 *      security:
 *         - bearerAuth: []
 *      requestBody:
 *        $ref: "#/components/requestBodies/Todos"
 *      responses:
 *        200:
 *          description: Таска успешно создана
 * components:
 *   requestBodies:
 *     Todos:
 *       description: Свойства таски, которые были добавлены.
 *       required: true
 *       content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               title:
 *                 type: string
 *               isCompleted:
 *                 type: boolean
 *               idUser:
 *                 type: string
 *          400:
 *            description: Некорректный запрос. Проверьте параметры запроса
 *          500:
 *            description: Ошибка сервера. Не удалось создать таску
 *              
 */

router.post('/create', authenticateToken, validateTodoBody, TodoControllers.createTodo)

/**
 * @swagger
 * /api/todo/{id}:
 *      patch:
 *         summary: Частичное обновление таски
 *         description: Обновляет часть данных таски по его ID.
 *         tags:
 *           - Todos
 *         security:
 *           - bearerAuth: []
 *         requestBody:
 *            $ref: "#/components/requestBodies/Todos"
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *      responses:
 *        201:
 *          description: Успешное обновление таски
 *        400:
 *          description: Некорректный запрос. Проверьте, пожалуйста, ваши исходные данные.
 *        404:
 *          description: Таска с указанным идентификатором не найдена.
 *        500:
 *          description: Внутренняя ошибка сервера. Пожалуйста, попробуйте повторить запрос позже.
 */

router.patch('/:id', authenticateToken, validateTodoId, TodoControllers.editTodoTitle)

/**
 * @swagger
 * /api/todo/{id}/isCompleted:
 *    patch:
 *      summary: Обновление поля таски isCompleted
 *      description: Создание обновленной таски в системе
 *      tags:
 *        - Todos
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        $ref: "#/components/requestBodies/Todos"
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *      responses:
 *        200:
 *          description: Таска успешно создана
 * components:
 *   requestBodies:
 *     Todos:
 *       description: Свойства таски, которые были добавлены.
 *       required: true
 *       content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isCompleted:
 *                 type: boolean
 *               
 *          400:
 *            description: Некорректный запрос. Проверьте параметры запроса
 *          500:
 *            description: Ошибка сервера. Не удалось создать таску
 *              
 */

router.patch('/:id/isComplited', authenticateToken, TodoControllers.editTodoIsCompleted)

/**
 * @swagger
 * /api/todo/delete/{id}:
 *    delete:
 *      summary: Удалить таску
 *      description: Удаление таски из общей базы
 *      tags:
 *        - Todos
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *      responses:
 *        200:
 *          description: Успешное удаление таски
 *        404:
 *          description: Таска с указанным идентификатором не найдена.
 *        500:
 *          description: Внутренняя ошибка сервера. Пожалуйста, попробуйте повторить запрос позже.
 */

router.delete('/delete/:id', authenticateToken, TodoControllers.deleteTodo)



module.exports = router