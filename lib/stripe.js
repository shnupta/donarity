import { loadStripe } from '@stripe/stripe-js'

const getStripe = () => {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_API_KEY)
  return stripePromise
}

export default getStripe;
