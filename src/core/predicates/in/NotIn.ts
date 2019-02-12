import { In } from './In';

export class NotIn extends In {
  toSql(): string {
    return `NOT ${super.toSql()}`;
  }
}
