const Koa = require('koa');
const respond = require('koa-respond');
const bodyParse = require('koa-bodyparser');

const router = require('./routes');

require('dotenv').config();

class App {
  constructor() {
    this.server = new Koa();

    this.middlewares();
  }

  middlewares() {
    this.server.use(respond());
    this.server.use(bodyParse());
    this.server.use(router.routes());
  }
}

module.exports = new App().server;
