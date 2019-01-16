import { FromClause } from './FromClause';

describe('FromClause', () => {
  it('table() WITHOUT alias', () => {
    const fc = new FromClause().table('user');
    expect(fc.toSql()).toEqual('FROM user');
  });

  it('table() WITH alias', () => {
    const fc = new FromClause().table('user', 'u');
    expect(fc.toSql()).toEqual('FROM user AS u');
  });

  xit('toPrettySql()', () => {
    const fc = new FromClause().table('user', 'u');
    expect(fc.toPrettySql()).toEqual('FROM user AS u');
  });
});
