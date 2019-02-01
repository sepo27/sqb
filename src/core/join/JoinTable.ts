import { Join } from './Join';

export class JoinTable extends Join {
  private table: string;

  constructor(table: string) {
    super();
    this.table = table;
  }

  protected tableFactor(): string {
    return this.table;
  }
}
