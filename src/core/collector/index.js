const Users = require('./users');
const Events = require('./events');
const Attributes = require('./attributes');
const { Evaluations, EvaluationsStatus } = require('./evaluations');
const Accounts = require('./accounts');
const { Transfers, TransferTypes } = require('./transfer');
const Coins = require('./coins');

module.exports = {
  User: Users,
  Event: Events,
  Attribute: Attributes,
  Evaluation: Evaluations,
  Account: Accounts,
  Transfer: Transfers,
  Coin: Coins,
  TransferTypes,
  EvaluationsStatus,
};
