import Stripe from 'stripe'

export const getServerStripe = () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  return stripe
}