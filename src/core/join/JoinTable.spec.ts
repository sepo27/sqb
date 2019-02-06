import { JoinTable } from './JoinTable';
import { JoinType } from './Join';
import { JoinError } from './JoinError';

describe('JoinTable', () => {
  it('base condition', () => {
    const join = new JoinTable('comment')
      .condition('id = commentId');

    expect(join.toSql()).toEqual('JOIN comment ON id = commentId');
  });

  it('with alias', () => {
    const join = new JoinTable('comment')
      .alias('c')
      .condition('c.id = u.commentId');

    expect(join.toSql()).toEqual('JOIN comment AS c ON c.id = u.commentId');
  });

  it('LEFT', () => {
    const join = new JoinTable('comment')
      .condition('id = commentId')
      .type(JoinType.LEFT);

    expect(join.toSql()).toEqual('LEFT JOIN comment ON id = commentId');
  });

  it('LEFT with alias', () => {
    const join = new JoinTable('comment')
      .alias('c')
      .condition('c.id = u.commentId')
      .type(JoinType.LEFT);

    expect(join.toSql()).toEqual('LEFT JOIN comment AS c ON c.id = u.commentId');
  });

  it('errors out when condition is not set', () => {
    expect(
      () => new JoinTable('comment').toSql(),
    ).toThrowError(new JoinError('JOIN condition is not set.'));
  });

  it('with condition params args', () => {
    const join = new JoinTable('comment')
      .condition('id = commentId AND userId = ?', 1);

    expect(join.toSql())
      .toEqual('JOIN comment ON id = commentId AND userId = 1');
  });

  it('with condition array args', () => {
    const join = new JoinTable('comment')
      .condition('id = commentId AND (userId = ? OR authorId = ?)', [1, '2']);

    expect(join.toSql())
      .toEqual('JOIN comment ON id = commentId AND (userId = 1 OR authorId = 2)');
  });
});
