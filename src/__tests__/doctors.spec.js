const app = require('../app')
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(app);
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

describe('Test Doctor Get', () => {
    test('responds to /doctors', async () => {
        const res = await request.get('/doctors');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })
})