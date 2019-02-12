import { Predicate } from '../interface'; // eslint-disable-line no-unused-vars
import { sqlParams } from '../../sql/sqlParams'; // eslint-disable-line no-unused-vars

type Value = number | string;

export class In implements Predicate {
  private values: Value[];
  private placeholders: string[];

  constructor(values: Value[]) {
    this.values = values;
    this.placeholders = Array(values.length)
      .fill(undefined)
      .map(() => '?');
  }

  toSql(): string {
    return sqlParams(`IN(${this.placeholders.join(', ')})`, this.values);
  }
}
