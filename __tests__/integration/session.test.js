const request = require('supertest');

const app = require('../../src/app');
const truncate = require('../utils/truncate');
const factory = require('../factories');

describe('Authentication', () => {

    beforeEach(async () => {
        await truncate();
    });

    it('Should authenticate with valid credentials', async () => {

        const user = await factory.create('User', {
            password: '123'
        });

        const response = await request(app).post('/sessions').send({
            email: user.email,
            password: '123'
        });

        expect(response.status).toBe(200);

    });

    it('Should not authenticate with invalid credentials', async () => {

        const user = await factory.create('User', {
            password: '123'
        });

        const response = await request(app).post('/sessions').send({
            email: user.email,
            password: '1234'
        });

        expect(response.status).toBe(401);
    });

    it('Should return jwt token when authenticated', async () => {
        const user = await factory.create('User', {
            password: '123'
        });

        const response = await request(app).post('/sessions').send({
            email: user.email,
            password: '123'
        });

        expect(response.body).toHaveProperty('token');
    });

    it('Should be able to access private routes when authenticated', async () => {
        const user = await factory.create('User', {
            password: '123'
        });

        const response = await request(app)
            .get('/dashboard')
            .set('Authorization', `Bearer ${user.generateToken()}`);

        expect(response.status).toBe(200);
    });

    it('Should not be able to access private routes without jwt token', async () => {
        const user = await factory.create('User', {
            password: '123'
        });

        const response = await request(app)
            .get('/dashboard');

        expect(response.status).toBe(401);
    });

    it('Should not be able to access private routes with invalid jwt token', async () => {
        const user = await factory.create('User', {
            password: '123'
        });

        const response = await request(app)
            .get('/dashboard')
            .set('Authorization', `Bearer 123`);

        expect(response.status).toBe(401);
    })

});