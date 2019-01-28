import { JoinClause } from './JoinClause';

describe('JoinClause', () => {
  it('table()', () => {
    const jc = new JoinClause()
      .table('comment', 'id = commentId');

    expect(jc.toSql()).toEqual('JOIN comment ON id = commentId');
  });
});
