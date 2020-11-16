const { Base } = require('./utils/request');
const { User } = require('../../core/collector');
const { startServer } = require('..');
const { db } = require('../../db');

let server;
let requests;
const payload = {
  name: 'daniel',
  email: 'dc.daniiel@gmail.com',
  birthday: '1996-07-19',
  password: '123456',
};

const _clean = async () => {
  await db('users').del();
};

beforeAll(async () => {
  server = await startServer(4000);
  requests = Base(server, 'users');
});

beforeEach(async () => {
  await _clean();
});

afterAll(async () => {
  await _clean();
  await db.destroy();
  await server.close();
});

describe('User Rest API', () => {
  test('POST/users should create a user', async () => {
    const response = await requests.create(payload);
    expect(response.status).toBe(201);
  });
});
