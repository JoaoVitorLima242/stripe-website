import { Request, Response } from 'express'
import stripe, { LineItems, Shipping } from '../services/stripe'
import { RequestWithBody } from '../@types/express'
import { calculateOrderAmount } from '../utils/calculates'
import { cartItem } from '../@types/cartItem'

type createCheckoutBody = { lineItems: LineItems; customerEmail: string }

type PaymentIntentBody = {
  cartItems: cartItem[]
  description: string
  receiptEmail: string
  shipping: Shipping
}
class CheckoutControllers {
  public createCheckoutSession = async (
    req: RequestWithBody<createCheckoutBody>,
    res: Response,
  ) => {
    const { lineItems, customerEmail } = req.body

    if (!lineItems || !customerEmail) {
      return res
        .status(400)
        .json({ error: 'missing required session parameters' })
    }
    try {
      const session = await stripe.createCheckoutSession(
        lineItems,
        customerEmail,
      )

      res.status(200).json({ sessionId: session.id })
    } catch (error) {
      console.log(error)
      res
        .status(400)
        .json({ error: 'An error occured, unable to create session' })
    }
  }

  public webhook = (req: Request, res: Response) => {
    const sig = req.headers['stripe-signature'] as string

    try {
      const event = stripe.webhookConstructEvent(req.rawBody, sig)

      if (stripe.webhookHandlers[event.type]) {
        const session = event.data.object
        stripe.webhookHandlers[event.type](session)
      }

      res.status(200).json({ status: event.type })
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: `Webhook error ${error.message}` })
      }
    }
  }

  public paymentIntent = async (
    req: RequestWithBody<PaymentIntentBody>,
    res: Response,
  ) => {
    try {
      const { cartItems, description, receiptEmail, shipping } = req.body

      if (!cartItems || !description || !receiptEmail || !shipping) {
        throw new Error('Missing required params!')
      }

      const amount = calculateOrderAmount(cartItems)

      const paymentIntent = await stripe.createPaymentIntent(
        amount,
        description,
        receiptEmail,
        shipping,
      )

      return res.status(200).json({ clientSecret: paymentIntent.client_secret })
    } catch (error) {
      console.log(error)
      return res
        .status(400)
        .json({ error: 'An error occured, unable to create payment intent' })
    }
  }
}

export default new CheckoutControllers()
