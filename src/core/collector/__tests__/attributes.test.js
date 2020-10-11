const _ = require('lodash');
const { PersistorProvider } = require('../../persist/provider');
const { Attributes } = require('../index');
const { persist_options } = require('../../settings');

beforeEach(async () => {
  await _clean();
});

afterAll(async () => {
  if (persist_options[0] === 'knex') {
    await Attributes.getPersist()._db.destroy();
  }
});

describe('Attributes', () => {
  it('constructor works', async () => {
    const Attribute = new Attributes('testAttribute');
    expect(Attribute).toBeInstanceOf(Attributes);
  });

  it('save Attribute', async () => {
    const Attribute = new Attributes('testAttribute');
    const saved_Attribute = await Attribute.save();

    expect(saved_Attribute.id).toBe(Attribute.id);
  });

  it('fetch Attribute', async () => {
    let Attribute = new Attributes('testAttribute');
    Attribute = await Attribute.save();

    let fetchUser = await Attributes.fetch(Attribute.id);
    expect(fetchUser._id).toBe(Attribute.id);
    await Attributes.delete(Attribute.id);
    fetchUser = await Attributes.fetch(Attribute.id);
    expect(fetchUser).toBeFalsy();
  });

  it('delete Attribute', async () => {
    let Attribute = new Attributes('testAttribute');
    Attribute = await Attribute.save();

    let fetched_Attribute = await Attributes.fetch(Attribute.id);

    expect(fetched_Attribute._id).toBe(Attribute.id);
    await Attributes.delete(Attribute.id);
    fetched_Attribute = await Attributes.fetch(Attribute.id);
    expect(fetched_Attribute).toBeFalsy();
  });
});

const _clean = () => {
  const persistor = PersistorProvider.getPersistor(...persist_options);
  const Attribute = persistor.getPersistInstance('Attributes');
  Attribute.deleteAll();
};
