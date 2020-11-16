const request = require('supertest');

const Base = (server, path) => {
  return {
    async create(body) {
      return request(server).post(`/api/${path}`).send(body);
    },
    async get(id) {
      return request(server).get(`${`/api/${path}`}/${id}`);
    },
    async getAll() {
      return request(server).getAll(`/api/${path}`);
    },
    async update(body) {
      return request(server).put(`/api/${path}`).send(body);
    },
    async delete(id) {
      return request(server).delete(id);
    },
  };
};

module.exports = { Base };
