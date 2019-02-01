import { FromTable } from './FromTable';
import { assertSql } from '../../../test/assertions/assertSql';

describe('FromTable', () => {
  it('base', () => {
    const from = new FromTable('user');
    expect(from.toSql()).toEqual('FROM user');
  });

  it('with alias', () => {
    const from = new FromTable('user').alias('u');
    expect(from.toSql()).toEqual('FROM user AS u');
  });

  it('with join', () => {
    const from = new FromTable('user')
      .join('comment', 'id = commentId');

    assertSql(from, `
      FROM user
      JOIN comment ON id = commentId
    `);
  });

  it('with aliased join', () => {
    const fc = new FromTable('user')
      .alias('u')
      .join('comment', 'c', 'c.id = u.id');

    assertSql(fc, `
      FROM user AS u
      JOIN comment AS c ON c.id = u.id
    `);
  });

  it('with multiple aliased joins', () => {
    const fc = new FromTable('user')
      .alias('u')
      .join('comment', 'c', 'c.id = u.commentId')
      .join('page', 'p', 'p.id = u.pageId');

    assertSql(fc, `
      FROM user AS u
      JOIN comment AS c ON c.id = u.commentId
      JOIN page AS p ON p.id = u.pageId
    `);
  });

  it('does not add duplicate join', () => {
    const fc = new FromTable('user')
      .alias('u')
      .join('comment', 'c', 'c.id = u.commentId')
      .join('comment', 'c', 'c.id = u.commentId');

    assertSql(fc, `
      FROM user AS u
      JOIN comment AS c ON c.id = u.commentId
    `);
  });

  it('with left join', () => {
    const fc = new FromTable('user')
      .leftJoin('comment', 'id = commentId');

    assertSql(fc, `
      FROM user
      LEFT JOIN comment ON id = commentId
    `);
  });

  it('with aliased left join', () => {
    const fc = new FromTable('user')
      .alias('u')
      .leftJoin('comment', 'c', 'c.id = u.commentId');

    assertSql(fc, `
      FROM user AS u
      LEFT JOIN comment AS c ON c.id = u.commentId
    `);
  });

  it('with multiple aliased left joins', () => {
    const fc = new FromTable('user')
      .alias('u')
      .leftJoin('comment', 'c', 'c.id = u.commentId')
      .leftJoin('page', 'p', 'p.id = u.pageId');

    assertSql(fc, `
      FROM user AS u
      LEFT JOIN comment AS c ON c.id = u.commentId
      LEFT JOIN page AS p ON p.id = u.pageId
    `);
  });

  it('with multiple mixed joins', () => {
    const fc = new FromTable('user')
      .alias('u')
      .join('page', 'p', 'p.id = u.pageId')
      .leftJoin('comment', 'c', 'c.pageId = p.id');

    assertSql(fc, `
      FROM user AS u
      JOIN page AS p ON p.id = u.pageId
      LEFT JOIN comment AS c ON c.pageId = p.id
    `);
  });

  it('does not add duplicate left joins', () => {
    const fc = new FromTable('user')
      .alias('u')
      .leftJoin('comment', 'c', 'c.id = u.commentId')
      .leftJoin('comment', 'c', 'c.id = u.commentId');

    assertSql(fc, `
      FROM user AS u
      LEFT JOIN comment AS c ON c.id = u.commentId
    `);
  });

  it('with multiple similar mixed joins', () => {
    const fc = new FromTable('user')
      .alias('u')
      .join('comment', 'c', 'c.id = u.commentId')
      .leftJoin('comment', 'c', 'c.id = u.commentId');

    assertSql(fc, `
      FROM user AS u
      JOIN comment AS c ON c.id = u.commentId
      LEFT JOIN comment AS c ON c.id = u.commentId
    `);
  });
});
