const User = require('./user');
const Event = require('./event');
const Attribute = require('./attribute');
const Coin = require('./coin');
const Account = require('./account');
const Reward = require('./reward');
const { Evaluation, EvaluationsStatus } = require('./evaluation');
const { Transfer, TransferTypes } = require('./transfer');

module.exports = {
  User,
  Event,
  Attribute,
  Account,
  Coin,
  TransferTypes,
  EvaluationsStatus,
  Reward,
  Evaluation,
  Transfer,
};
