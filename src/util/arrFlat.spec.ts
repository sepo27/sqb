import { arrFlat } from './arrFlat';

describe('arrFlat()', () => {
  it('single array', () => {
    expect(arrFlat([[1]])).toEqual([1]);
  });

  it('multi arrays', () => {
    expect(arrFlat([[2], [3]])).toEqual([2, 3]);
  });

  it('mixed nested', () => {
    expect(
      arrFlat([[1, 2], 3, 4, [5, [6, [7], 8], 9], 10]),
    ).toEqual(
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    );
  });
});
