import { Router } from 'express'
import CheckoutControllers from '../controllers/checkout'

const routes = Router()

routes.post('/create-session', CheckoutControllers.createCheckoutSession)

export default routes