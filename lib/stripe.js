import { loadStripe } from '@stripe/stripe-js'
import Stripe from 'stripe'

export const getClientStripe = () => {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_API_KEY)
  return stripePromise
}

export const getServerStripe = () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  return stripe
}
