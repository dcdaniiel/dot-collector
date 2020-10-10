const Koa = require('koa');
const respond = require('koa-respond');
const bodyParse = require('koa-bodyparser');

const router = require('./api/routes');

require('dotenv').config();

class App {
  constructor() {
    this._server = new Koa();

    this.middlewares();
  }

  middlewares() {
    this._server.use(respond());
    this._server.use(bodyParse());
    this._server.use(router.routes());
  }
}

module.exports = { server: new App()._server };
