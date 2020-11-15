const { PersistorProvider } = require('../../persist/provider');
const { Evaluation, EvaluationsStatus, User, Attribute, Event } = require('..');
const { persist_options } = require('../../../../settings/persist_options');

const _clean = () => {
  const persistor = PersistorProvider.getPersistor(...persist_options);
  const evalt = persistor.getPersistInstance('Evaluation');
  const attr = persistor.getPersistInstance('Attribute');
  const evnt = persistor.getPersistInstance('Event');
  const usr = persistor.getPersistInstance('User');
  const acc = persistor.getPersistInstance('Account');

  evalt.deleteAll();
  attr.deleteAll();
  evnt.deleteAll();
  usr.deleteAll();
  acc.deleteAll();
};

beforeEach(async () => {
  await _clean();

  await new User('test', 'a@g.com', '', '').save();
  await new User('teste2', 'b@g.com', '', '').save();
  await new Event('eventName').save();
  await new Attribute('attributeName').save();
});

afterAll(async () => {
  await _clean();
  if (persist_options[0] === 'knex') {
    await Evaluation.getPersist()._db.destroy();
  }
});

describe('Evaluations', () => {
  it('constructor works', async () => {
    const evals = new Evaluation();
    evals.description = 'description test';
    expect(evals).toBeInstanceOf(Evaluation);
  });

  it('should create a evaluation', async () => {
    const usr = await User.getPersist().getAll();
    const event = await Event.getPersist().first();
    const attribute = await Attribute.getPersist().first();

    let evals = new Evaluation(usr[0].id, usr[1].id, event.id, attribute.id, 9);
    evals.description = 'description test';
    evals = await evals.save();

    const fetched = await Evaluation.fetch(evals.id);

    expect(evals.id).toBe(fetched.id);
  });

  it('should delete a evaluation', async () => {
    const user = await User.getPersist().getAll();
    const event = await Event.getPersist().first();
    const attribute = await Attribute.getPersist().first();

    let evals = new Evaluation(
      user[0].id,
      user[1].id,
      event.id,
      attribute.id,
      9
    );
    evals.description = 'description test';
    evals = await evals.save();

    const fetched = await Evaluation.fetch(evals.id);

    expect(evals.id).toBe(fetched.id);
    expect(evals._status).toBe(EvaluationsStatus.ACTIVE());

    evals.status = EvaluationsStatus.DELETED();
    evals = await evals.save();

    expect(evals._status).toBe(EvaluationsStatus.DELETED());
  });
});
