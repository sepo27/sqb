import { sprintf } from 'sprintf-js';

export class Sql {
  private template: string;

  constructor(template: string) {
    this.template = template;
  }

  print(params: (string|boolean)[]): string {
    return sprintf(this.template, ...params);
  }
}
