import { Sql } from '../sql/Sql';
import { SqlPrintable } from '../interfaces'; // eslint-disable-line no-unused-vars
import { JoinError } from './JoinError';
// import { isArr } from '../../util/isType';

export enum JoinType {
  CROSS = 'CROSS', // eslint-disable-line no-unused-vars
  LEFT = 'LEFT', // eslint-disable-line no-unused-vars
  // RIGHT = 'RIGHT',
}

type ConditionParam = string | number;
type ConditionArgs = [string] | [string, ...ConditionParam[]];

interface MatchParams {
  tableFactor: string;
  condition: string;
  alias?: string;
  type?: JoinType;
}

export interface JoinParams {
  type?: JoinType;
  alias?: string;
}

export abstract class Join implements SqlPrintable {
  private type$: JoinType;
  private alias$: string;
  private condition$: string;
  private conditionParams$: ConditionParam[];
  private sql: Sql;

  constructor() {
    this.sql = new Sql('[%s] JOIN %s [AS %s] ON %s');
  }

  type(type: JoinType): this {
    this.type$ = type;
    return this;
  }

  alias(alias: string): this {
    this.alias$ = alias;
    return this;
  }

  condition(...conditionArgs: ConditionArgs): this {
    this.condition$ = conditionArgs[0];

    if (conditionArgs.length > 1) {
      this.conditionParams$ = conditionArgs.slice(1);
    }

    return this;
  }

  match(params: MatchParams): boolean {
    const { type, tableFactor, alias, condition } = params;

    let match = this.tableFactor() === tableFactor && condition === this.condition$;

    if (type) match = match && this.type$ === type;
    if (alias) match = match && this.alias$ === alias;

    return match;
  }

  toSql(): string {
    if (!this.condition$) {
      throw new JoinError('JOIN condition is not set.');
    }

    const
      type = this.type$ || false,
      alias = this.alias$ || false;

    return this.sql.print([type, this.tableFactor(), alias, this.condition$]);
  }

  protected abstract tableFactor(): string;
}
