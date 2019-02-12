import { SqlPrintable } from '../interfaces'; // eslint-disable-line no-unused-vars
import { BoolOperator } from '../literals';

interface Expression {
  value: string,
  operator?: BoolOperator,
}

export class SearchCondition implements SqlPrintable {
  private expressions: Expression[] = [];

  and(expression: string): this {
    this.expressions.push({
      value: expression,
      operator: BoolOperator.AND,
    });
    return this;
  }

  or(expression: string): this {
    this.expressions.push({
      value: expression,
      operator: BoolOperator.OR,
    });
    return this;
  }

  toSql(): string {
    return this.expressions
      .map(expr => `${expr.operator || ''} (${expr.value})`.trim())
      .join('\n');
  }
}
