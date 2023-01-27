import express from 'express'
import cors from 'cors'

import IndexRoutes from '../routes/index.routes'
import CheckoutRoutes from '../routes/checkout.routes'

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
    this.express.use('/', IndexRoutes)
    this.express.use('/checkout', CheckoutRoutes)
  }
}

export default new App().express
