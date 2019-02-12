import { assertSql } from '../../../test/assertions/assertSql';
import { SearchCondition } from './SearchCondition';

describe('SearchCondition', () => {
  xit('with single AND', () => {
    const cond = new SearchCondition().and('u.id = 1');

    assertSql(cond, `
      (u.id = 1)
    `);
  });

  // it('expression with multiple ANDs', () => {
  //   const cond = new SearchCondition('u.id = 1')
  //     .and('u.status != "blocked"')
  //     .and('u.email = "some@email.com"');
  //
  //   assertSql(cond, `
  //     (u.id = 1)
  //     AND (u.status != "blocked")
  //     AND (u.email = "some@email.com")
  //   `);
  // });

  // it('expression with OR', () => {
  //   const cond = new SearchCondition('u.id = 1')
  //     .or('u.id IS NULL');
  //
  //   assertSql(cond, `
  //     (u.id = 1)
  //     OR (u.id IS NULL)
  //   `);
  // });

  // it('expression with multiple ORs', () => {
  //   const cond = new SearchCondition('u.id = 1')
  //     .or('u.id IS NULL')
  //     .or('u.organizationId IS NULL');
  //
  //   assertSql(cond, `
  //     (u.id = 1)
  //     OR (u.id IS NULL)
  //     OR (u.organizationId IS NULL)
  //   `);
  // });

  // it('expression with mixed ANDs, ORs', () => {
  //   const cond = new SearchCondition('u.id = 1')
  //     .and('u.email IS NOT NULL')
  //     .or('u.organizationId IS NULL');
  //
  //   assertSql(cond, `
  //     (u.id = 1)
  //     AND (u.email IS NOT NULL)
  //     OR (u.organizationId IS NULL)
  //   `);
  // });

  // TODO: when nested and / or, group them ?

  // it('with in predicate', () => {
  //   const cond = new SearchCondition('u.id IN()');
  // });
});
