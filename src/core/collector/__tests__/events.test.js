const _ = require('lodash');
const { PersistorProvider } = require('../../persist/provider');
const { Events } = require('../index');

beforeEach(async () => {
  const persistor = PersistorProvider.getPersistor('memory');
  const Event = persistor.getPersistInstance('Events');
  Event.deleteAll();
});

describe('Events', () => {
  it('constructor works', async () => {
    const Event = new Events('testEvent');
    expect(Event).toBeInstanceOf(Events);
  });

  it('save Event', async () => {
    const Event = new Events('testEvent');
    const saved_Event = await Event.save();

    expect(saved_Event.id).toBe(Event.id);
  });

  it('fetch Event', async () => {
    let Event = new Events('testEvent');
    Event = await Event.save();

    let fetchUser = await Events.fetch(Event.id);
    expect(fetchUser._id).toBe(Event.id);
    await Events.delete(Event.id);
    fetchUser = await Events.fetch(Event.id);
    expect(fetchUser).toBeFalsy();
  });

  it('delete Event', async () => {
    let Event = new Events('testEvent');
    Event = await Event.save();

    let fetched_Event = await Events.fetch(Event.id);

    expect(fetched_Event._id).toBe(Event.id);
    await Events.delete(Event.id);
    fetched_Event = await Events.fetch(Event.id);
    expect(fetched_Event).toBeFalsy();
  });
});
