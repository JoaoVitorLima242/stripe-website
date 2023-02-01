import express from 'express'
import cors from 'cors'

import IndexRoutes from '../routes/index.routes'
import CheckoutRoutes from '../routes/checkout.routes'
import firebase from '../services/firebase'

class App {
  public express: express.Application

  public constructor() {
    this.express = express()
    this.middlewares()
    this.database()
    this.routes()
  }

  private middlewares() {
    this.express.use(
      express.json({
        verify: (req, _req, buffer) => (req['rawBody'] = buffer),
      }),
    )
    this.express.use(cors())
    this.express.use(express.static('uploads'))
    this.express.use(firebase.decodeJWT)
  }

  private database() {}

  private routes() {
    this.express.use('/', IndexRoutes)
    this.express.use('/checkout', CheckoutRoutes)
  }
}

export default new App().express
