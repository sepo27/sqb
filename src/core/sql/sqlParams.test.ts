import { sqlParams } from './sqlParams';

describe('sqlParams()', () => {
  it('replaces one arg param', () => {
    expect(sqlParams('id = ?', '1')).toEqual('id = 1');
  });

  it('replaces multiple arg params', () => {
    expect(sqlParams('id = ? AND userId = ?', 1, '2'))
      .toEqual('id = 1 AND userId = 2');
  });

  it('replaces one array param', () => {
    expect(sqlParams('id = ?', ['1'])).toEqual('id = 1');
  });

  xit('replaces multiple array params', () => {
    expect(sqlParams('id = ? ans userId = ?', ['1', 2]))
      .toEqual('id = 1 AND userId = 2');
  });
});
