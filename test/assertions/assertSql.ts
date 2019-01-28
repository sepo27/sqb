import { SqlPrintable } from '../../src/core/interfaces'; // eslint-disable-line no-unused-vars

export const assertSql = (block: SqlPrintable, expectedSql: string) => {
  expect(block.toSql())
    .toEqual(
      expectedSql
        .replace(/\n\s*/g, '\n')
        .trim(),
    );
};
