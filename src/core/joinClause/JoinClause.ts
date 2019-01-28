import { QueryBlock } from '../coreInterfaces'; // eslint-disable-line no-unused-vars
import { Sql } from '../sql/Sql';

export class JoinClause implements QueryBlock {
  private tableName: string;
  private alias: string;
  private condition: string;

  table(name: string, condition: string): this {
    this.tableName = name;
    this.condition = condition;
    return this;
  }

  toSql(): string {
    return new Sql('JOIN %s ON %s')
      .print([[this.tableName, this.condition]]);
  }

  toPrettySql(): string {
    return '';
  }
}
