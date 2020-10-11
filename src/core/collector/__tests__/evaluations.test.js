const _ = require('lodash');
const { PersistorProvider } = require('../../persist/provider');
const { Evaluations } = require('../index');
const { persist_options } = require('../../settings');

beforeEach(async () => {
  await _clean();
});

afterAll(async () => {
  if (persist_options[0] === 'knex') {
    // await Evaluations.getPersist()._db.destroy();
  }
});

describe('Evaluations', () => {
  it('constructor works', async () => {
    const Evaluation = new Evaluations(
      '0d6d7370-0c17-11eb-85aa-1da19b01c9c9',
      '0d6d7371-0c17-11eb-85aa-1da19b01c9c9',
      '0d6c6200-0c17-11eb-85aa-1da19b01c9c9',
      9
    );
    Evaluation.description = 'description test';
    expect(Evaluation).toBeInstanceOf(Evaluations);
  });

  it('should create a evaluation', async () => {
    let Evaluation = new Evaluations(
      '0d6d7370-0c17-11eb-85aa-1da19b01c9c9',
      '0d6d7371-0c17-11eb-85aa-1da19b01c9c9',
      '0d6cfe40-0c17-11eb-85aa-1da19b01c9c9',
      '0d6c6200-0c17-11eb-85aa-1da19b01c9c9',
      9
    );
    Evaluation.description = 'description test';
    Evaluation = await Evaluation.save();

    const fetched = await Evaluations.fetch(Evaluation.id);

    expect(Evaluation.id).toBe(fetched.id);
  });
});

const _clean = () => {
  const persistor = PersistorProvider.getPersistor(...persist_options);
  const Evaluation = persistor.getPersistInstance('Evaluations');
  Evaluation.deleteAll();
};
