import express from 'express'
import cors from 'cors'
import 'module-alias/register'

import IndexRoute from '@routes/index.routes'
// import { config } from './vars'

class App {
  public express: express.Application

  public constructor() {
    this.express = express()
    this.middlewares()
    this.database()
    this.routes()
  }

  private middlewares() {
    this.express.use(express.json())
    this.express.use(cors())
    this.express.use(express.static('uploads'))
  }

  private database() {}

  private routes() {
    this.express.use('/', IndexRoute)
  }
}

export default new App().express
