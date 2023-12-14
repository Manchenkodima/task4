const chai = require('chai');

const app = require('./index');

const expect = chai.expect;
const request = require('supertest');

describe('GET /api/users', () => {
    it('Должен возвращать всех users и статус код 200', async () => {
        const response = await request(app).get('/api/users');
        expect(response.status).to.equal(200)
    })
})

describe('POST /api/users/create', () => {
    it('должен регистрировать нового пользователя и возвращать сообщение', async () => {
        const userData = {
            email: 'user@gmail.com',
            password: '123123'
        };
        const response = await request(app).post('/api/users/create').send(userData);
        expect(response.status).to.equal(201);
    })
    it('должен возвращать ошибку при неполных данных', async () => {
        const userData = {
            username: 'testuser'
        };
        const response = await request(app).post('/api/users/create').send(userData);
        expect(response.status).to.equal(400);
    });
})
describe('POST /api/users/login', () => {
    it('должен логировать пользователя', async () => {
        const userData = {
            email: 'user@gmail.com',
            password: '123123'
        };
        const response = await request(app).post('/api/users/login').send(userData);
        expect(response.statusCode).to.equal(200)
    })
    it('должен вернуть статус 403 при неверном пароле', async () => {
        const userData = {
            email: 'user@gmail.com',
            password: '12312'
        };
        const response = await request(app).post('/api/users/login').send(userData);
        expect(response.statusCode).to.equal(403);
    });
    it('проверка токена', async () => {
        const userData = {
            email: 'user@gmail.com',
            password: '123123'
        };
        const response = await request(app).post('/api/users/login').send(userData);
        expect(response.body.token).to.not.be.null;
    });
    
})
describe('GET /api/todo', () => {
    it('Должен возвращать все ToDo и статус код 200', async () => {
        const authToken = 
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzYzI1MTk2OC03YjI4LTQwZmEtODQ0Ny1mMGQ0MDY4NmU0MmMiLCJpYXQiOjE3MDI1NTk2MTd9.p0VLF8IlPZoTzb5RNFrMtqH4Go4n0q8jUllFbgDAf-c"
        const response = await request(app).get('/api/todo')
        .set("Authorization", `Bearer ${authToken}`);
        expect(response.status).to.equal(200)
    })
})
describe("POST /api/todo/create", () => {
    it("должен создавать новую todo и возвращать ее", async () => {
        const newTodo = {
            title: "Новая задача",
            isCompleted: false
        };
        const authToken =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzYzI1MTk2OC03YjI4LTQwZmEtODQ0Ny1mMGQ0MDY4NmU0MmMiLCJpYXQiOjE3MDI1NTk2MTd9.p0VLF8IlPZoTzb5RNFrMtqH4Go4n0q8jUllFbgDAf-c"
        
            const response = await request(app).post("/api/todo/create")
            .set("Authorization", `Bearer ${authToken}`)
            .send(newTodo);
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("id");
        expect(response.body.title).to.equal(newTodo.title);
    })
})

describe("PATCH /api/todo/{id}", () => {
    it("должен успешно обновлять задачи с корректными данными", async () => {
        const authToken =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzYzI1MTk2OC03YjI4LTQwZmEtODQ0Ny1mMGQ0MDY4NmU0MmMiLCJpYXQiOjE3MDI1NTk2MTd9.p0VLF8IlPZoTzb5RNFrMtqH4Go4n0q8jUllFbgDAf-c"
        const taskId = "1380cb61-3ce8-4c07-9dc7-b97ebc3f3664";
        const editTodo = {
            title: "Новый заголовок",
        };
        const response = await request(app)
            .patch(`/api/todo/${taskId}`)
            .set("Authorization", `Bearer ${authToken}`)
            .send(editTodo);
        expect(response.status).to.equal(200);
    })
})