import * as dotenv from 'dotenv'

dotenv.config()

export const config: {
  PORT: number
  MONGO_URI: string
  STRIPE_PUBLIC_KEY: string
  STRIPE_SECRET_KEY: string
  STRIPE_WEB_HOOK_SECRET: string
  GOOGLE_APPLICATION_CREDENTIALS: string
  APP_URL: string
} = {
  PORT: Number(process.env.PORT) || 8080,
  MONGO_URI: String(process.env.MONGO_URI),
  STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY || '',
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || '',
  STRIPE_WEB_HOOK_SECRET: process.env.STRIPE_WEB_HOOK_SECRET || '',
  GOOGLE_APPLICATION_CREDENTIALS:
    process.env.GOOGLE_APPLICATION_CREDENTIALS || '',
  APP_URL: process.env.APP_URL || 'http://localhost:3000',
}
