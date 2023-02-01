import { Router } from 'express'
import CheckoutControllers from '../controllers/checkout'
import firebase from '../services/firebase'

const routes = Router()

routes.post('/create-session', CheckoutControllers.createCheckoutSession)
routes.post('/webhook', CheckoutControllers.webhook)
routes.post('/payment-intent', CheckoutControllers.paymentIntent)
routes.post(
  '/save-payment-method',
  firebase.validateUser,
  CheckoutControllers.setUpIntent,
)
routes.get(
  '/payment-methods',
  firebase.validateUser,
  CheckoutControllers.setUpIntent,
)
routes.put(
  '/update-payment-intent',
  firebase.validateUser,
  CheckoutControllers.updatePaymentIntent,
)

export default routes
