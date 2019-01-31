import { FromClause } from './FromClause';
import { assertSql } from '../../../test/assertions/assertSql';

describe('FromClause', () => {
  it('table() WITHOUT alias', () => {
    const fc = new FromClause().table('user');
    expect(fc.toSql()).toEqual('FROM user');
  });

  it('table() WITH alias', () => {
    const fc = new FromClause().table('user', 'u');
    expect(fc.toSql()).toEqual('FROM user AS u');
  });

  it('join() with alias', () => {
    const fc = new FromClause()
      .table('user', 'u')
      .join('comment', 'c', 'c.id = u.id');

    assertSql(fc, `
      FROM user AS u
      JOIN comment AS c ON c.id = u.id
    `);
  });

  it('multiple join() with alias', () => {
    const fc = new FromClause()
      .table('user', 'u')
      .join('comment', 'c', 'c.id = u.commentId')
      .join('page', 'p', 'p.id = u.pageId');

    assertSql(fc, `
      FROM user AS u
      JOIN comment AS c ON c.id = u.commentId
      JOIN page AS p ON p.id = u.pageId
    `);
  });

  it('does not add duplicate join', () => {
    const fc = new FromClause()
      .table('user', 'u')
      .join('comment', 'c', 'c.id = u.commentId')
      .join('comment', 'c', 'c.id = u.commentId');

    assertSql(fc, `
      FROM user AS u
      JOIN comment AS c ON c.id = u.commentId
    `);
  });
});
