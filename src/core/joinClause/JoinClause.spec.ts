import { JoinClause } from './JoinClause';

describe('JoinClause', () => {
  it('table()', () => {
    const jc = new JoinClause()
      .table('comment', 'id = commentId');

    expect(jc.toSql()).toEqual('JOIN comment ON id = commentId');
  });

  it('table() with alias', () => {
    const jc = new JoinClause()
      .table('comment', 'c', 'c.id = u.commentId');

    expect(jc.toSql()).toEqual('JOIN comment AS c ON c.id = u.commentId');
  });
});
