const { PersistorProvider } = require('../../persist/provider');
const { Coin } = require('..');
const { persist_options } = require('../../settings');

const _clean = async () => {
  const persistor = PersistorProvider.getPersistor(...persist_options);
  const cc = persistor.getPersistInstance('Coins');

  await cc.deleteAll();
};

beforeEach(async () => {
  await _clean();
});

afterAll(async () => {
  if (persist_options[0] === 'knex') {
    await Coin.getPersist()._db.destroy();
  }
});

describe('Coins', () => {
  it('constructor works', async () => {
    const acc = new Coin();
    expect(acc).toBeInstanceOf(Coin);
  });

  it('add coins', async () => {
    // const userA = new User();
    // const coin = await new Coins().save();
    //
    // expect(acc.user_id).toBe(coin.id);
  });
});
