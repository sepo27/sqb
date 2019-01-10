import { sprintf } from 'sprintf-js';

export class SqlPart {
  private template: string;

  constructor(template: string) {
    this.template = template;
  }

  print(params: (string|boolean)[]): string {
    return sprintf(this.template, ...params);
  }
}
