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

  it('optional part in the beginning', () => {
    expect(new Sql('[%s] JOIN %s').print(['LEFT', 'comment']))
      .toEqual('LEFT JOIN comment');
  });

  it('optional part in the beginning2', () => {
    expect(
      new Sql('[%s] JOIN %s ON %s')
        .print(['LEFT', ['comment', 'id = commentId']]),
    )
      .toEqual('LEFT JOIN comment ON id = commentId');
  });

  it('omitting optional part in the beginning', () => {
    expect(new Sql('[%s] JOIN %s').print([false, 'comment']))
      .toEqual('JOIN comment');
  });

  it('optional part in the beginning AND middle', () => {
    expect(
      new Sql('[%s] JOIN %s [AS %s] ON %s')
        .print(['LEFT', 'comment', 'c', 'c.id = u.commentId']),
    )
      .toEqual('LEFT JOIN comment AS c ON c.id = u.commentId');
  });

  it('omitting optional part in the beginning AND require in the middle', () => {
    expect(
      new Sql('[%s] JOIN %s [AS %s] ON %s')
        .print([false, 'comment', 'c', 'c.id = u.commentId']),
    )
      .toEqual('JOIN comment AS c ON c.id = u.commentId');
  });

  it('omitting optional part in the beginning AND omitting in the middle', () => {
    expect(
      new Sql('[%s] JOIN %s [AS %s] ON %s')
        .print([false, 'comment', false, 'c.id = u.commentId']),
    )
      .toEqual('JOIN comment ON c.id = u.commentId');
  });
});
