import { In } from './In';
import { NotIn } from './NotIn';

describe('In() predicate', () => {
  it('with numbers', () => {
    expect(new In([1, 2, 3]).toSql()).toEqual('IN(1, 2, 3)');
  });

  it('with strings', () => {
    expect(new In(['1', '2', '3']).toSql()).toEqual('IN(1, 2, 3)');
  });

  it('with mixed', () => {
    expect(new In(['1', 2, '3']).toSql()).toEqual('IN(1, 2, 3)');
  });
});

describe('NotIn() predicate', () => {
  it('with numbers', () => {
    expect(new NotIn([1, 2, 3]).toSql()).toEqual('NOT IN(1, 2, 3)');
  });

  it('with strings', () => {
    expect(new NotIn(['1', '2', '3']).toSql()).toEqual('NOT IN(1, 2, 3)');
  });

  it('with mixed', () => {
    expect(new NotIn(['1', 2, '3']).toSql()).toEqual('NOT IN(1, 2, 3)');
  });
});
