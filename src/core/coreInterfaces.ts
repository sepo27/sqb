
export interface SqlPrintable {
  toSql(): string;
}

export interface PrettyPrintable {
  toPrettySql(): string;
}

export interface QueryBlock extends SqlPrintable, PrettyPrintable {}
