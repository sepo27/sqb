import { Sql } from '../sql/Sql';
import { SqlPrintable } from '../interfaces'; // eslint-disable-line no-unused-vars
import { Join, JoinType } from '../join/Join'; // eslint-disable-line no-unused-vars
import { JoinTable } from '../join/JoinTable';

type JoinParams = [string, string]
  | [string, string, string]
  | [JoinType, string, string]
  | [JoinType, string, string, string];

type LeftJoinParams = [string, string] | [string, string, string];

export abstract class From implements SqlPrintable {
  private alias$: string;
  private joins$: Join[] = [];
  private sql: Sql;

  constructor() {
    this.sql = new Sql('FROM %s [AS %s]');
  }

  alias(alias: string): this {
    this.alias$ = alias;
    return this;
  }

  join(...params: JoinParams): this {
    const { type, table, alias, condition } = this.parseJoinParams(params);

    if (this.joins$.some(j => j.match({ type, tableFactor: table, alias, condition }))) {
      return this;
    }

    const join = new JoinTable(table).condition(condition);

    if (type) join.type(type);
    if (alias) join.alias(alias);

    this.joins$.push(join);

    return this;
  }

  leftJoin(...params: LeftJoinParams): this {
    const { table, alias, condition } = this.parseJoinParams(params);
    return this.join(JoinType.LEFT, table, alias, condition);
  }

  toSql(): string {
    const alias = this.alias$ || false;

    let sql = this.sql.print([this.tableFactor(), alias]);

    this.joins$.forEach((j) => {
      sql += `\n${j.toSql()}`;
    });

    return sql;
  }

  protected abstract tableFactor(): string;

  private parseJoinParams(params: JoinParams) {
    let type, table, alias, condition;

    if (params.length === 2) {
      [table, condition] = params;
    } else if (params.length === 3 && params[0] in JoinType) {
      [type, table, condition] = params;
    } else if (params.length === 3) {
      [table, alias, condition] = params;
    } else if (params.length === 4) {
      [type, table, alias, condition] = params;
    }

    return { type, table, alias, condition };
  }
}
