const chai = require('chai');
const supertest = require('supertest');
const app = require('./index');

const expect = chai.expect;
const request = require('supertest');

describe('POST /api/users/create', () => {
    it('It should POST a new user', async () => {
        const userData = {
            email: 'user@gmail.com',
            password: '123123'
        };
        const response = await request(app).post('/api/users/create').send(userData);

        expect(response.status).to.equal(201);
    })
    it('должен возвращать ошибку при неполных данных', async () => {
        const userData = {
            username: 'testuser',
        };

        const response = await request(app).post('/api/users/create').send(userData);

        expect(response.status).to.equal(400);
        expect(response.body).to.have.property('error');
        expect(response.body.error).to.equal('Username and password are required');
    });

})