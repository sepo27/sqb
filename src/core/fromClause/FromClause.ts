import { QueryBlock } from '../interfaces'; // eslint-disable-line no-unused-vars
import { Sql } from '../sql/Sql';
import { JoinClause, JoinTableParams } from '../joinClause/JoinClause'; // eslint-disable-line no-unused-vars

export class FromClause implements QueryBlock {
  private tableName: string;
  private alias: string;
  private joins: JoinClause[] = [];

  table(name: string, alias?: string): this {
    this.tableName = name;
    this.alias = alias;
    return this;
  }

  join(...params: JoinTableParams): this {
    this.joins.push(new JoinClause().table(...params));
    return this;
  }

  toSql(): string {
    let sql = new Sql('FROM %s [AS %s]').print([this.tableName, this.alias]);

    this.joins.forEach((join) => {
      sql += `\n${join.toSql()}`;
    });

    return sql;
  }
}
