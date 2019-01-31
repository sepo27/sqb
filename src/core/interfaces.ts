
export interface SqlPrintable {
  toSql(): string;
}

export interface QueryBlock extends SqlPrintable {}
