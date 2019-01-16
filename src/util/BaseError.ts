export abstract class BaseError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    // @ts-ignore
    if (typeof Error.captureStackTrace === 'function') {
      // @ts-ignore
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error(message)).stack;
    }
  }
}
