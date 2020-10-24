const { PersistorProvider } = require('../../persist/provider');
const { Transfer, TransferTypes, Account, User } = require('..');
const { persist_options } = require('../../settings');

const _clean = async () => {
  const persistor = PersistorProvider.getPersistor(...persist_options);
  const users = persistor.getPersistInstance('Users');
  const transfers = persistor.getPersistInstance('Transfers');

  await transfers.deleteAll();
  await users.deleteAll();
};

beforeEach(async () => {
  await _clean();
});

afterAll(async () => {
  if (persist_options[0] === 'knex') {
    await Transfer.getPersist()._db.destroy();
  }
});

describe('Transfers', () => {
  it('constructor works', async () => {
    const acc = new Transfer();
    expect(acc).toBeInstanceOf(Transfer);
  });

  it('create a transfer', async () => {
    const userA = await new User('test', 't@a.com', '', '').save();
    const userB = await new User('test', 'g@com', '', '').save();

    const accA = await Account.getPersist().getAccountUser(userA.id);
    const accB = await Account.getPersist().getAccountUser(userB.id);

    const data = await new Transfer(
      accA.id,
      accB.id,
      TransferTypes.COINS(),
      10,
      'description text'
    ).save();

    expect(data.id).toBeTruthy();
  });
});
