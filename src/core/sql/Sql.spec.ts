import { Sql } from './Sql';
import { SqlError } from './SqlError';

describe('Sql', () => {
  it('from simple template', () => {
    expect(new Sql('FROM %s').print(['user']))
      .toEqual('FROM user');
  });

  it('errors out when missing required params', () => {
    expect(() => new Sql('FROM %s').print([]))
      .toThrowError(new SqlError('"FROM %s" has 1 required params. 0 passed.'));
  });

  it('errors out when params overflow', () => {
    expect(() => new Sql('FROM %s').print(['user', 'u']))
      .toThrowError(new SqlError('"FROM %s" has 1 total params. 2 passed.'));
  });

  it('omitting optional part', () => {
    expect(new Sql('FROM %s [AS %s]').print(['user']))
      .toEqual('FROM user');
  });

  it('with optional part', () => {
    expect(new Sql('FROM %s [AS %s]').print(['user', 'u']))
      .toEqual('FROM user AS u');
  });

  it('errors out when params overflow with optional', () => {
    expect(() => new Sql('FROM %s [AS %s]').print(['user', 'u', 'dummy']))
      .toThrowError(new SqlError('"FROM %s [AS %s]" has 2 total params. 3 passed.'));
  });

  it('with optional part in the middle', () => {
    expect(new Sql('GROUP BY [%s] %s').print(['ALL', 'u.name']))
      .toEqual('GROUP BY ALL u.name');
  });

  it('omitting optional part in the middle', () => {
    expect(new Sql('GROUP BY [%s] %s').print([false, 'u.name']))
      .toEqual('GROUP BY u.name');
  });
});
