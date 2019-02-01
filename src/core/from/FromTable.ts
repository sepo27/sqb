import { From } from './From';

export class FromTable extends From {
  private table: string;

  constructor(table: string) {
    super();
    this.table = table;
  }

  protected tableFactor(): string {
    return this.table;
  }
}
