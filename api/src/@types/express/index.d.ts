import { Request } from 'express'

declare module 'http' {
  interface IncomingMessage {
    rawBody: Buffer
  }
}

export interface RequestWithBody<T> extends Request {
  body: T
}
