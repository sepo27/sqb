type Param = string | number;

export type SqlParams = [Param[]] | Param[];

export const sqlParams = (sql: string, ...params: SqlParams): string => { // eslint-disable-line
  // console.log('params', params);
  // @ts-ignore
  return params.reduce(
    (acc: string, p) => acc.replace('?', `${p}`),
    sql,
  );
};
