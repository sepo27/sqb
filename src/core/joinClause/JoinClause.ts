import { QueryBlock } from '../interfaces'; // eslint-disable-line no-unused-vars
import { Sql } from '../sql/Sql';

export type JoinTableParams = [string, string] | [string, string, string];

export enum JoinType {
  // CROSS = 'CROSS',
  LEFT = 'LEFT', // eslint-disable-line no-unused-vars
  // RIGHT = 'RIGHT',
}

export class JoinClause implements QueryBlock {
  private type: JoinType | false;
  private tableName: string;
  private alias: string;
  private condition: string;

  constructor(type?: JoinType) {
    this.type = type || false;
  }

  table(...params: JoinTableParams): this {
    const [tableName, alias, condition] = this.parseParams(params);

    this.tableName = tableName;
    this.alias = alias;
    this.condition = condition;

    return this;
  }

  match(params: JoinTableParams, type: JoinType | false = false): boolean {
    const [tableName, alias, condition] = this.parseParams(params);
    return this.tableName === tableName
      && (
        (alias && this.alias === alias) || !this.alias
      )
      && this.condition === condition
      && this.type === type;
  }

  toSql(): string {
    return new Sql('[%s] JOIN %s [AS %s] ON %s')
      .print([this.type, this.tableName, this.alias, this.condition]);
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
