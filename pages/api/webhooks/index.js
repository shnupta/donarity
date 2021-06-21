import Cors from "micro-cors";
import { buffer } from "micro";
import prisma from "lib/prisma";
import { getServerStripe } from "lib/serverStripe";

const stripe = getServerStripe();

const cors = Cors({
  methods: ["POST", "HEAD"],
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

async function handleCheckoutSessionCompleted(session) {
  try {
    const checkoutSession = await prisma.checkoutSession.findUnique({
      where: {
        sessionId: session.id,
      },
    });

    // No need to create a donation in here
    let donation;
    let subscription;
    if (session.mode === "payment") {
    donation = await prisma.donation.update({
      where: {
        paymentIntentId: checkoutSession.paymentIntentId,
        stripeCustomerId: session.customer,
      },
      data: {
        completed: true,
      },
    });
    } else if (session.mode === "subscription") {
      subscription = await prisma.subscription.create({
        data: {
          subscriptionId: session.subscription,
          amount: session.metadata.amount,
          frequency: session.metadata.frequency,
          userId: parseInt(session.metadata.userId),
          charityId: session.metadata.charityId,
          active: true,
          stripeCustomerId: session.customer,
        }
      })

      const newSession = await prisma.checkoutSession.update({
        where: {
          sessionId: session.id,
        },
        data: {
          subscriptionId: session.subscription
        }
      })
    }
  } catch (err) {
    console.error(err);
  }
}

async function handlePaymentIntentSucceeded(paymentIntent) {
  if (paymentIntent.invoice) {
    const invoice = await stripe.invoices.retrieve(paymentIntent.invoice)
    const subscription = await prisma.subscription.findUnique({
      where: {
        subscriptionId: invoice.subscription
      }
    })
    const donation = await prisma.donation.create({
      data: {
        paymentIntentId: paymentIntent.id,
        completed: true,
        frequency: subscription.frequency,
        amount: subscription.amount,
        charityId: subscription.charityId,
        userId: subscription.userId,
        subscriptionId: subscription.subscriptionId,
        stripeCustomerId: paymentIntent.customer,
      }
    })
  }
}

async function handlePaymentMethodAttached(paymentMethod) {
  const customer = await stripe.customers.update(paymentMethod.customer, {
    invoice_settings: {
      default_payment_method: paymentMethod.id,
    },
  });
}

async function handler(req, res) {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        sig,
        webhookSecret
      );
    } catch (err) {
      console.error(err.message);
      res.status(400).send(`Webhook error: ${err.message}`);
      return;
    }

    if (event.type === "checkout.session.completed") {
      await handleCheckoutSessionCompleted(event.data.object);
    } else if (event.type === "payment_intent.succeeded") {
      await handlePaymentIntentSucceeded(event.data.object);
    } else if (event.type === "payment_method.attached") {
      await handlePaymentMethodAttached(event.data.object);
    }
    res.status(200).json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

export default cors(handler);
