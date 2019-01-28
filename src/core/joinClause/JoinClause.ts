import { QueryBlock } from '../coreInterfaces'; // eslint-disable-line no-unused-vars
import { Sql } from '../sql/Sql';

type TableParams = [string, string] | [string, string, string];

export class JoinClause implements QueryBlock {
  private tableName: string;
  private alias: string;
  private condition: string;

  table(...params: TableParams): this {
    if (params.length === 2) {
      const [name, condition] = params;
      this.tableName = name;
      this.condition = condition;
    } else if (params.length === 3) {
      const [name, alias, condition] = params;
      this.tableName = name;
      this.alias = alias;
      this.condition = condition;
    }

    return this;
  }

  toSql(): string {
    return new Sql('JOIN %s [AS %s] ON %s')
      .print([this.tableName, this.alias, this.condition]);
  }

  toPrettySql(): string {
    return '';
  }
}
