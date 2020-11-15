const { PersistedEntity } = require('../base');

class TransferTypes {
  static COINS() {
    return 'coins';
  }

  static REWARDS() {
    return 'rewards';
  }
}

class Transfer extends PersistedEntity {
  static getEntityClass() {
    return Transfer;
  }

  static serialize(transfer) {
    return {
      id: transfer._id,
      created_at: transfer._created_at,
      from_account: transfer._from_account,
      to_account: transfer._to_account,
      type: transfer._type,
      value: transfer._value,
      description: transfer._description,
    };
  }

  static deserialize(serialized) {
    if (serialized) {
      const transfer = new Transfer(
        serialized.from_account,
        serialized.to_account,
        serialized.value,
        serialized.description
      );
      transfer._id = serialized.id;
      transfer._created_at = serialized.created_at;

      return transfer;
    }
    return undefined;
  }

  constructor(from_account, to_account, type, value, description) {
    super();

    this._from_account = from_account;
    this._to_account = to_account;
    this._type = type;
    this._value = value;
    this._description = description;
  }

  get from_account() {
    return this._from_account;
  }

  get to_account() {
    return this._from_account;
  }

  get type() {
    return this._type;
  }

  get value() {
    return this._value;
  }

  get description() {
    return this._description;
  }
}

module.exports = { Transfer, TransferTypes };
