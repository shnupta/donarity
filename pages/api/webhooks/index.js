import Cors from 'micro-cors'
import { buffer } from 'micro'
import prisma from 'lib/prisma'
import { getServerStripe } from 'lib/stripe'

const stripe = getServerStripe()

const cors = Cors({
	methods: ['POST', 'HEAD']
})

export const config = {
  api: {
    bodyParser: false, 
  }
}

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

async function handleChargeSucceeded(charge) {
  console.log(charge)
}

async function handler(req, res) {
  if (req.method === 'POST') {
    const buf = await buffer(req) 
    const sig = req.headers["stripe-signature"]

    let event

    try {
      event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret)
    } catch (err) {
      console.error(err.message)
      res.status(400).send(`Webhook error: ${err.message}`)
      return
    }

    // if (event.type === 'charge.succeeded') {
    //   handleChargeSucceeded(event.data.object)
    // }

    console.log(event)
    res.status(200).json({received: true})
  }
}

export default cors(handler)