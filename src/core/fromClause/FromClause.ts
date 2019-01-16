import { QueryBlock } from '../coreInterfaces'; // eslint-disable-line no-unused-vars
import { Sql } from '../sql/Sql';

export class FromClause implements QueryBlock {
  private tableName: string;
  private alias: string;

  table(name: string, alias?: string): this {
    this.tableName = name;
    this.alias = alias;
    return this;
  }

  toSql(): string {
    return new Sql('FROM %s [AS %s]')
      .print([this.tableName, this.alias]);
  }

  toPrettySql(): string {
    return this.toSql();
  }
}
