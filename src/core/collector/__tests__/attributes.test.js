const _ = require('lodash');
const { PersistorProvider } = require('../../persist/provider');
const { Attribute } = require('../index');
const { persist_options } = require('../../../../settings/persist_options');

beforeEach(async () => {
  await _clean();
});

afterAll(async () => {
  if (persist_options[0] === 'knex') {
    await Attribute.getPersist()._db.destroy();
  }
});

describe('Attributes', () => {
  it('constructor works', async () => {
    const attr = new Attribute('testAttribute');
    expect(attr).toBeInstanceOf(Attribute);
  });

  it('save Attribute', async () => {
    const attr = new Attribute('testAttribute');
    const saved_Attribute = await attr.save();

    expect(saved_Attribute.id).toBe(attr.id);
  });

  it('fetch Attribute', async () => {
    let attr = new Attribute('testAttribute');
    attr = await attr.save();

    let fetchUser = await Attribute.fetch(attr.id);
    expect(fetchUser._id).toBe(attr.id);
    await Attribute.delete(attr.id);
    fetchUser = await Attribute.fetch(attr.id);
    expect(fetchUser).toBeFalsy();
  });

  it('delete Attribute', async () => {
    let attr = new Attribute('testAttribute');
    attr = await attr.save();

    let fetched_Attribute = await Attribute.fetch(attr.id);

    expect(fetched_Attribute._id).toBe(attr.id);
    await Attribute.delete(attr.id);
    fetched_Attribute = await Attribute.fetch(attr.id);
    expect(fetched_Attribute).toBeFalsy();
  });
});

const _clean = () => {
  const persistor = PersistorProvider.getPersistor(...persist_options);
  const attr = persistor.getPersistInstance('Attributes');
  attr.deleteAll();
};
