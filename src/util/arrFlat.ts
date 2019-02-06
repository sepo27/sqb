import { isArr } from './isType';

export const arrFlat = <R extends any>(arr: R[]): R[] =>
  arr.reduce(
    (acc, v) => acc.concat(
      isArr(v) ? arrFlat(v) : v,
    ),
    [],
  );
