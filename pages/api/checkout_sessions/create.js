import { DonationFrequency } from ".prisma/client";
import prisma from "lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    var {
      sessionId,
      userId,
      charityId,
      amount,
      frequency,
      paymentIntentId,
      stripeCustomerId,
    } = req.body;
    let newCheckoutSession;
    let newDonation;
    let newSubscription;
    try {
      if (frequency === DonationFrequency.Single) {
      newDonation = await prisma.donation.create({
        data: {
          paymentIntentId: paymentIntentId,
          frequency: frequency,
          amount: amount,
          charityId: charityId,
          userId: userId,
        },
      });
      } else {
        newSubscription = await prisma.subscription.create({
          data: {
            active: false,
            frequency: frequency,
            amount: amount,
            charityId: charityId,
            userId: userId,
          }
        })
      }

      newCheckoutSession = await prisma.checkoutSession.create({
        data: {
          sessionId: sessionId,
          paymentIntentId: newDonation ? paymentIntentId : null,
          subscriptionId: newSubscription ? newSubscription.id : null,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).end(err);
    }

    res.status(200).json(newCheckoutSession);
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
