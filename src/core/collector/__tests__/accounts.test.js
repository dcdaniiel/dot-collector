const { PersistorProvider } = require('../../persist/provider');
const { Account, User } = require('../index');
const { persist_options } = require('../../../../settings/persist_options');

const _clean = async () => {
  const persistor = PersistorProvider.getPersistor(...persist_options);
  const acc = persistor.getPersistInstance('Account');
  const usr = persistor.getPersistInstance('User');

  await acc.deleteAll();
  await usr.deleteAll();
};

beforeEach(async () => {
  await _clean();
});

afterAll(async () => {
  if (persist_options[0] === 'knex') {
    await Account.getPersist()._db.destroy();
  }
});

describe('Accounts', () => {
  it('constructor works', async () => {
    const acc = new Account('testeAcc');
    expect(acc).toBeInstanceOf(Account);
  });

  it('create a account', async () => {
    const user = await new User('test', 'a@a.com', '', '').save();
    const acc = await Account.getPersist().getAccountUser(user.id);

    expect(acc.user_id).toBe(user.id);
  });

  it('delete a account', async () => {
    const user = await new User('test', 'a@a.com', '', '').save();
    const accPersist = await Account.getPersist();

    const acc = await accPersist.getAccountUser(user.id);
    expect(acc.user_id).toBe(user.id);

    let accDel = await accPersist.delete(acc.id);
    accDel = await accPersist.get(acc.id);
    expect(accDel).toBeFalsy();
  });

  if (persist_options[0] === 'knex') {
    it('cascade account user', async () => {
      const user = await new User('test', 'a@a.com', '', '').save();
      const accPersist = await Account.getPersist();

      const acc = await accPersist.getAccountUser(user.id);
      expect(acc.user_id).toBe(user.id);

      await User.delete(user.id);

      const accDel = await accPersist.getAccountUser(user.id);

      expect(accDel).toBeFalsy();
    });
  }
});
