const User = require('./users');
const Event = require('./events');
const Attribute = require('./attributes');
const Coin = require('./coins');
const Account = require('./accounts');
const Reward = require('./rewards');
const { Evaluations, EvaluationsStatus } = require('./evaluations');
const { Transfers, TransferTypes } = require('./transfer');

module.exports = {
  User,
  Event,
  Attribute,
  Account,
  Coin,
  TransferTypes,
  EvaluationsStatus,
  Reward,
  Evaluation: Evaluations,
  Transfer: Transfers,
};
