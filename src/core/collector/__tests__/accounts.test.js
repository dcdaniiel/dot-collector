const { PersistorProvider } = require('../../persist/provider');
const { Accounts, Users } = require('../index');
const { persist_options } = require('../../settings');

const _clean = async () => {
  const persistor = PersistorProvider.getPersistor(...persist_options);
  const Account = persistor.getPersistInstance('Accounts');
  const User = persistor.getPersistInstance('Users');

  // await Account.deleteAll();
  // await User.deleteAll();
};

beforeEach(async () => {
  await _clean();
});

afterAll(async () => {
  if (persist_options[0] === 'knex') {
    await Accounts.getPersist()._db.destroy();
  }
});

describe('Accounts', () => {
  it('constructor works', async () => {
    const acc = new Accounts('testeAcc');
    expect(acc).toBeInstanceOf(Accounts);
  });

  it('create a account', async () => {
    const user = await new Users('test', 'a@a.com', '', '').save();
    const acc = await Accounts.getPersist().getAccountUser(user.id);

    expect(acc.user_id).toBe(user.id);
  });

  it(`don't create user duplicated`, async () => {
    await new Users('test', 'a@a.com', '', '').save();
    let user = await new Users('TESTE_2', 'a@a.com', '', '').save();
    user = await Users.getPersist().get(user.id);

    expect(user).toBeFalsy();
  });
});
