const { PersistedEntity } = require('../base');

class Reward extends PersistedEntity {
  static getEntityClass() {
    return Reward;
  }

  static serialize(reward) {
    return {
      id: reward._id,
      author_id: reward._author_id,
      transfer_id: reward._transfer_id,
      quantity: reward._quantity,
      name: reward._name,
      created_at: reward._created_at,
    };
  }

  static deserialize(serialized) {
    if (serialized) {
      const reward = new Reward(
        serialized._author_id,
        serialized._transfer_id,
        serialized._name,
        serialized._quantity
      );

      reward.id = serialized._id;
      reward.created_at = serialized._created_at;

      return reward;
    }

    return undefined;
  }

  constructor(author_id, transfer_id, name, quantity) {
    super();

    this._author_id = author_id;
    this._transfer_id = transfer_id;
    this._name = name;
    this._quantity = quantity;
  }
}

module.exports = Reward;
