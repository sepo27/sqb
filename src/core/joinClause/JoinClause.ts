import { QueryBlock } from '../interfaces'; // eslint-disable-line no-unused-vars
import { Sql } from '../sql/Sql';

export type JoinTableParams = [string, string] | [string, string, string];

export class JoinClause implements QueryBlock {
  private tableName: string;
  private alias: string;
  private condition: string;

  table(...params: JoinTableParams): this {
    const [tableName, alias, condition] = this.parseParams(params);

    this.tableName = tableName;
    this.alias = alias;
    this.condition = condition;

    return this;
  }

  match(params: JoinTableParams): boolean {
    const [tableName, alias, condition] = this.parseParams(params);
    return this.tableName === tableName
      && (
        (alias && this.alias === alias) || !this.alias
      )
      && this.condition === condition;
  }

  toSql(): string {
    return new Sql('JOIN %s [AS %s] ON %s')
      .print([this.tableName, this.alias, this.condition]);
  }

  private parseParams(params: JoinTableParams) {
    let tableName, alias, condition;

    if (params.length === 3) {
      [tableName, alias, condition] = params;
    } else if (params.length === 2) {
      [tableName, condition, alias] = [...params, null];
    } else {
      throw new Error(`Invalid join params: ${params}`);
    }

    return [tableName, alias, condition];
  }
}
