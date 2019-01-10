import { sprintf } from 'sprintf-js';
import { QueryBlock } from '../coreInterfaces'; // eslint-disable-line no-unused-vars

export class FromClause implements QueryBlock {
  private tableName: string;
  private alias: string;

  table(name: string, alias?: string): this {
    this.tableName = name;
    this.alias = alias;
    return this;
  }

  toSql(): string {
    let sql = 'FROM %s';
    const params = [this.tableName];
    if (this.alias) {
      sql += ' AS %s';
      params.push(this.alias);
    }
    return sprintf(sql, ...params);
  }

  toPrettySql(): string {
    return '';
  }
}
