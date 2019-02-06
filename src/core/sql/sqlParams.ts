import { arrFlat } from '../../util/arrFlat';

type Param = string | number;

export type SqlParams = (Param | Param[])[];

export const sqlParams = (sql: string, ...params: SqlParams): string =>
  // @ts-ignore: TODO
  arrFlat<Param>(params).reduce(
    (acc: string, p) => acc.replace('?', `${p}`),
    sql,
  );
