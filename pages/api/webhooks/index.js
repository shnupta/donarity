import Cors from 'micro-cors'
import { buffer } from 'micro'
import prisma from 'lib/prisma'
import { getServerStripe } from 'lib/serverStripe'

const stripe = getServerStripe(); 

const cors = Cors({
	methods: ['POST', 'HEAD']
})

export const config = {
  api: {
    bodyParser: false, 
  }
}

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

async function handleCheckoutSessionCompleted(session) {
  const checkoutSession = await prisma.checkoutSession.findUnique({
    where: {
      sessionId: session.id
    }
  })

  console.log("Got checkout session:")
  console.log(checkoutSession)

  const donation = await prisma.donation.create({
    data: {
      frequency: checkoutSession.donationFrequency,
      amount: checkoutSession.amount,
      charityId: checkoutSession.charityId,
      userId: checkoutSession.userId
    }
  })

  console.log("Created donation:")
  console.log(donation)


  const updatedSession = await prisma.checkoutSession.update({
    where: {
      sessionId: session.id
    },
    data: {
      stripeCustomerId: session.customer,
      donationId: donation.id,
      completed: true
    }
  })
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

    if (event.type === 'checkout.session.completed') {
      handleCheckoutSessionCompleted(event.data.object)
    }
    res.status(200).json({received: true})
  }
}

export default cors(handler)