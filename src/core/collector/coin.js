const { PersistedEntity } = require('../base');

class Coin extends PersistedEntity {
  static getEntityClass() {
    return Coin;
  }

  static serialize(coin) {
    return {
      id: coin._id,
      author_id: coin._author_id,
      transfer_id: coin._transfer_id,
      quantity: coin._quantity,
      created_at: coin._created_at,
    };
  }

  static deserialize(serialized) {
    if (serialized) {
      const coin = new Coin(
        serialized._author_id,
        serialized._transfer_id,
        serialized._quantity
      );

      coin.id = serialized._id;
      coin.created_at = serialized._created_at;

      return coin;
    }

    return undefined;
  }

  constructor(author_id, transfer_id, quantity) {
    super();

    this._author_id = author_id;
    this._transfer_id = transfer_id;
    this._quantity = quantity;
  }
}

module.exports = Coin;
