import { sprintf } from 'sprintf-js';
import { SqlError } from './SqlError';

type SqlParam = string | boolean | string[];

interface SqlPart {
  readonly part: string;
  readonly hasParams: boolean;
  readonly required: boolean;
}

export class Sql {
  private sql: string;
  private parts: SqlPart[] = [];
  private requiredParamsCount: number = 0;
  private totalParamsCount: number = 0;

  constructor(sql: string) {
    this.sql = sql;
    this.parse(sql);
  }

  print(params: SqlParam[]): string {
    this.checkParamsCount(params.length);

    const printParts: string[] = [];
    let printParams = [];

    let pidx = 0;
    this.parts.forEach(({ part, hasParams }) => {
      if (hasParams) {
        if (params[pidx] === true) {
          printParts.push(part);
        } else if (params[pidx] && params[pidx] !== false) {
          printParts.push(part);
          printParams = printParams.concat(params[pidx]);
        }

        pidx++;
      } else {
        printParts.push(part);
      }
    });

    return sprintf(printParts.join(' '), ...printParams).trim();
  }

  private parse(sql: string) {
    let s = 0, e = 0, required = true;

    const add = () => {
      const
        part = sql.substring(s, e).trim(),
        hasParams = part.indexOf('%') > -1;

      if (hasParams) this.totalParamsCount++;
      if (hasParams && required) this.requiredParamsCount++;

      this.parts.push({ part, hasParams, required });
    };

    for (let i = 0; i < sql.length; i++) {
      if (sql[i] === '[') {
        add();
        s = e = i + 1;
        required = false;
      } else if (sql[i] === ']') {
        add();
        s = e = i + 1;
        required = true;
      } else {
        e++;
      }
    }

    if (s !== e) {
      add();
    }
  }

  private checkParamsCount(count: number) {
    if (count < this.requiredParamsCount) {
      throw new SqlError(
        sprintf(
          '"%s" has %d required params. %d passed.',
          this.sql,
          this.requiredParamsCount,
          count,
        ),
      );
    } else if (count > this.totalParamsCount) {
      throw new SqlError(
        sprintf(
          '"%s" has %d total params. %d passed.',
          this.sql,
          this.totalParamsCount,
          count,
        ),
      );
    }
  }
}
