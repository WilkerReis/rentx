// eslint-disable-next-line import/no-unresolved
import * as core from 'express-serve-static-core';

declare module 'express-serve-static-core' {
  export interface Request {
    user: {
      id: string;
    };
  }
}
