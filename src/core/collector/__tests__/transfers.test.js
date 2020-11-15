const { PersistorProvider } = require('../../persist/provider');
const { Transfer, TransferTypes, Account, User, Reward } = require('..');
const { persist_options } = require('../../../../settings/persist_options');

const _clean = async () => {
  const persistor = PersistorProvider.getPersistor(...persist_options);
  const users = persistor.getPersistInstance('User');
  const transfers = persistor.getPersistInstance('Transfer');

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

  it('create a transfer of type COINS', async () => {
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

  it('create a transfer of type REWARDS', async () => {
    const userA = await new User('test', 't@a.com', '', '').save();
    const userB = await new User('test', 'g@com', '', '').save();

    const accA = await Account.getPersist().getAccountUser(userA.id);
    const accB = await Account.getPersist().getAccountUser(userB.id);

    await new Reward(accA.id, null, 'desconto de 100%', 40).save();
    await new Reward(accA.id, null, 'desconto de 50%', 40).save();
    await new Reward(accA.id, null, 'desconto de 30%', 40).save();

    const { id } = await new Reward(
      accA.id,
      null,
      'desconto de 90%',
      40
    ).save();

    const data = await new Transfer(
      accA.id,
      accB.id,
      TransferTypes.REWARDS(),
      id,
      'add new reward to author'
    ).save();

    expect(data.id).toBeTruthy();
  });
});
