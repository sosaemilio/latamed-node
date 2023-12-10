// historyController.test.js
const request = require('supertest');
const historyController = require('../controllers/history');
const app = require('../app');

jest.mock('../db/connect', () => ({
  getDb: jest.fn(() => ({
    db: jest.fn(),
    collection: jest.fn(() => ({
      find: jest.fn(),
      toArray: jest.fn(),
      insertOne: jest.fn(),
      replaceOne: jest.fn(),
      remove: jest.fn(),
    })),
  })),
}));

jest.mock('../middleware/historyValidator', () => ({
  historyAuthenticated: jest.fn((req, res, next) => next()),
}));


describe('History Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get history', async () => {
    const response = await request(historyController.getHistory).get('/');
    expect(response.statusCode).toBe(200);
  },10000);

  it('should get single history', async () => {
    const response = await request(historyController.getSingleHistory).get('/1');
    expect(response.statusCode).toBe(200);
  },10000);

  it('should create new information', async () => {
    const response = await request(historyController.createNew
    )}
  )},10000)