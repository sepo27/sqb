import { JoinTable } from './JoinTable';
import { JoinType } from './Join';

describe('JoinTable.match', () => {
  it('by table & condition', () => {
    const join = new JoinTable('comment')
      .condition('id = commentId');

    expect(
      join.match({ tableFactor: 'comment', condition: 'id = commentId' }),
    ).toBeTruthy();
  });

  it('does not by table', () => {
    const join = new JoinTable('comment')
      .condition('id = commentId');

    expect(
      join.match({ tableFactor: 'page', condition: 'id = commentId' }),
    ).toBeFalsy();
  });

  it('does not by condition', () => {
    const join = new JoinTable('comment')
      .condition('id = commentId');

    expect(
      join.match({ tableFactor: 'comment', condition: 'c.id = u.commentId' }),
    ).toBeFalsy();
  });

  it('by table, condition & alias', () => {
    const join = new JoinTable('comment')
      .alias('c')
      .condition('c.id = c.commentId');

    expect(
      join.match({
        tableFactor: 'comment',
        alias: 'c',
        condition: 'c.id = c.commentId',
      }),
    ).toBeTruthy();
  });

  it('does not by alias', () => {
    const join = new JoinTable('comment')
      .alias('c')
      .condition('c.id = c.commentId');

    expect(
      join.match({
        tableFactor: 'comment',
        alias: 'cc',
        condition: 'c.id = c.commentId',
      }),
    ).toBeFalsy();
  });

  it('by type, table, alias & condition', () => {
    const join = new JoinTable('comment')
      .type(JoinType.LEFT)
      .alias('c')
      .condition('c.id = c.commentId');

    expect(
      join.match({
        type: JoinType.LEFT,
        tableFactor: 'comment',
        alias: 'c',
        condition: 'c.id = c.commentId',
      }),
    ).toBeTruthy();
  });

  it('does not by type', () => {
    const join = new JoinTable('comment')
      .type(JoinType.LEFT)
      .alias('c')
      .condition('c.id = c.commentId');

    expect(
      join.match({
        type: JoinType.CROSS,
        tableFactor: 'comment',
        alias: 'c',
        condition: 'c.id = c.commentId',
      }),
    ).toBeFalsy();
  });
});
