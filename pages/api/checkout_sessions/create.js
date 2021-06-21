import { DonationFrequency } from ".prisma/client";
import prisma from "lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
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
    try {
      if (frequency === DonationFrequency.Single) {
      newDonation = await prisma.donation.create({
        data: {
          paymentIntentId: paymentIntentId,
          frequency: frequency,
          amount: amount,
          charityId: charityId,
          userId: userId,
          stripeCustomerId: stripeCustomerId,
        },
      });
      }

      newCheckoutSession = await prisma.checkoutSession.create({
        data: {
          sessionId: sessionId,
          paymentIntentId: paymentIntentId,
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
