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
}

export default new CheckoutControllers()
