import { JoinClause, JoinType } from './JoinClause';
import { assertSql } from '../../../test/assertions/assertSql';

describe('JoinClause', () => {
  it('default', () => {
    const jc = new JoinClause()
      .table('comment', 'id = commentId');

    expect(jc.toSql()).toEqual('JOIN comment ON id = commentId');
  });

  it('with alias', () => {
    const jc = new JoinClause()
      .table('comment', 'c', 'c.id = u.commentId');

    expect(jc.toSql()).toEqual('JOIN comment AS c ON c.id = u.commentId');
  });

  it('LEFT', () => {
    const jc = new JoinClause(JoinType.LEFT)
      .table('comment', 'id = commentId');

    assertSql(jc, `
      LEFT JOIN comment ON id = commentId
    `);
  });

  it('LEFT with alias', () => {
    const jc = new JoinClause(JoinType.LEFT)
      .table('comment', 'c', 'c.id = u.commentId');

    assertSql(jc, `
      LEFT JOIN comment AS c ON c.id = u.commentId
    `);
  });
});
