import StripeApi from 'stripe'

import { config } from '../config/vars'

export type LineItems = StripeApi.Checkout.SessionCreateParams.LineItem[]
export type Shipping = StripeApi.PaymentIntentCreateParams.Shipping

class Stripe {
  private stripe: StripeApi
  private domainUrl: string

  constructor() {
    this.stripe = new StripeApi(config.STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15',
    })
    this.domainUrl = config.APP_URL
  }

  public createCheckoutSession = (
    lineItems: LineItems,
    customerEmail: string,
  ) => {
    return this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      customer_email: customerEmail,
      success_url: `${this.domainUrl}/success?session_id{CHECKOUT_SESSION_ID}`,
      cancel_url: `${this.domainUrl}/canceled`,
      shipping_address_collection: { allowed_countries: ['GB', 'US'] },
    })
  }

  public webhookConstructEvent = (rawBody: Buffer, signture: string) => {
    return this.stripe.webhooks.constructEvent(
      rawBody,
      signture,
      config.STRIPE_WEB_HOOK_SECRET,
    )
  }

  public createPaymentIntent = (
    amount: number,
    description: string,
    receiptEmail: string,
    shipping: Shipping,
  ) => {
    return this.stripe.paymentIntents.create({
      amount,
      currency: 'BRL',
      description,
      payment_method_types: ['card'],
      receipt_email: receiptEmail,
      shipping,
    })
  }
}

export default new Stripe()
