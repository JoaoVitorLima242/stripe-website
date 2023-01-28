import { Request, Response } from 'express'
import stripe, { LineItems } from '../services/stripe'

interface CreateCheckoutSessionReq extends Request {
  body: { lineItems: LineItems; customerEmail: string }
}

class CheckoutControllers {
  public createCheckoutSession = async (
    req: CreateCheckoutSessionReq,
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

  public webhook(req: Request, res: Response) {
    const sig = req.headers['stripe-signature'] as string

    try {
      const event = stripe.webhookConstructEvent(req.rawBody, sig)

      if (event.type === 'checkout.session.completed') {
        const session = event.data.object
        console.log('Event data', session)
      }
    } catch (error: any) {
      return res.status(400).json({ error: `Webhook error ${error.message}` })
    }
  }
}

export default new CheckoutControllers()
