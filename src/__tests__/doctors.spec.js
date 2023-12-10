const app = require('../app')
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(app);

describe('Test Doctor Get', () => {
    test('responds to /doctors', async () => {
        const res = await request.get('/doctors');
        expect(res.statusCode).toBe(200)
    })
})