const chai = require('chai');
const supertest = require('supertest');
const app = require('../ToDoList/index');

const expect = chai.expect;
const request = supertest(app);

describe('POST/api/users/create', () => {
    it('должен регистрировать нового пользователя и возвращать сообщение', async () => {
        const userData = {
            email: 'user@gmail.com',
            password: '123123'
        };
        const response = await request.post('/api/users/create').send(userData);

        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal('User registered successfully');
    })
    it('должен возвращать ошибку при неполных данных', async () => {
        const userData = {
            username: 'testuser',
        };

        const response = await request.post('/api/users/create').send(userData);

        expect(response.status).to.equal(400);
        expect(response.body).to.have.property('error');
        expect(response.body.error).to.equal('Username and password are required');
    });

})