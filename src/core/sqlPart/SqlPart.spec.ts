import { SqlPart } from './SqlPart';

describe('SqlPart', () => {
  it('prints from simple template', () => {
    expect(new SqlPart('FROM %s').print(['user']))
      .toEqual('FROM user');
  });

  xit('prints removing optional part', () => {
    expect(new SqlPart('FROM %s [AS %s]').print(['user', false]))
      .toEqual('FROM user');
  });
});
