// history.test.js
const request = require('supertest');
const express = require('express');
const router = require('../routes/history');
const app = express();

const mongodb = require('../db/connect');
const historyController = require('../controllers/history');
const { Database } = require('../db/connect');

jest.mock('../db/connect');
jest.mock('../controllers/history');

const mockDb = {
  db: jest.fn(),
  collection: jest.fn(() => ({
    find: jest.fn(),
    insertOne: jest.fn(),
    replaceOne: jest.fn(),
    remove: jest.fn()
  }))
};

Database.setDb(mockDb);
mongodb.getDb.mockReturnValue(mockDb);

app.use(express.json());
app.use('/', router);


