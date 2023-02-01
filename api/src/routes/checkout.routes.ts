import { Router } from 'express'
import CheckoutControllers from '../controllers/checkout'
import firebase from '../services/firebase'

const routes = Router()

routes.post('/create-session', CheckoutControllers.createCheckoutSession)
routes.post('/webhook', CheckoutControllers.webhook)
routes.post('/payment-intent', CheckoutControllers.paymentIntent)
routes.post(
  '/setup-intent',
  firebase.validateUser,
  CheckoutControllers.setUpIntent,
)

export default routes
