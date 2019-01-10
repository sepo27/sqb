import { Sql } from './Sql';

describe('Sql', () => {
  it('prints from simple template', () => {
    expect(new Sql('FROM %s').print(['user']))
      .toEqual('FROM user');
  });

  xit('prints removing optional part', () => {
    expect(new Sql('FROM %s [AS %s]').print(['user', false]))
      .toEqual('FROM user');
  });
});
