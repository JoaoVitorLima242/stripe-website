import * as dotenv from 'dotenv'

dotenv.config()

export const config: {
  PORT: number
  MONGO_URI: string
  AWS_ACCESS_ID: string
  AWS_SECRET_ACCESS: string
  AWS_BUCKET_NAME: string
  AWS_BUCKET_REGION: string
  STRIPE_PUBLIC_KEY: string
  STRIPE_SECRET_KEY: string
  STRIPE_WEB_HOOK_SECRET: string
  APP_URL: string
} = {
  PORT: Number(process.env.PORT) || 8080,
  MONGO_URI: String(process.env.MONGO_URI),
  AWS_ACCESS_ID: String(process.env.AWS_ACCESS_KEY),
  AWS_SECRET_ACCESS: String(process.env.AWS_SECRET_KEY),
  AWS_BUCKET_NAME: String(process.env.AWS_BUCKET_NAME),
  AWS_BUCKET_REGION: String(process.env.AWS_BUCKET_REGION),
  STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY || '',
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || '',
  STRIPE_WEB_HOOK_SECRET: process.env.STRIPE_WEB_HOOK_SECRET || '',
  APP_URL: process.env.APP_URL || 'http://localhost:3000',
}
