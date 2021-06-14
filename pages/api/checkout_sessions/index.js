import { getServerStripe } from "lib/serverStripe";
import prisma from "lib/prisma";
import { DonationFrequency } from ".prisma/client";

const MIN_AMOUNT = 0.3;
const MAX_AMOUNT = 100_000;

const stripe = getServerStripe();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { frequency, amount, charityId, userId } = req.body;

    let customerId;
    if (userId) {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      customerId = user.stripeCustomerId;
    }

    let subscription;
    if (frequency !== DonationFrequency.Single) {
      const stripeCustomer = await stripe.customers.retrieve(customerId);
      if (!stripeCustomer.invoice_settings.default_payment_method) {
        res.status(400).json({
          text: "User must setup a default payment method.",
        });
        return;
      }

      const price = await stripe.prices.create({
        unit_amount: amount * 100,
        currency: "gbp",
        recurring: {
          interval: frequency === DonationFrequency.Monthly ? "month" : "year",
        },
        product:
          frequency === DonationFrequency.Monthly
            ? process.env.MONTHLY_PRODUCT_ID
            : process.env.ANNUAL_PRODUCT_ID,
      });

      subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [
          {
            price: price.id,
          },
        ],
      });
    }

    let line_items;
    if (frequency === DonationFrequency.Single) {
      line_items = [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: "Donation",
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ];
    } else {
      line_items = [
        {
          price: subscription.items.data[0].price.id,
          quantity: 1,
        },
      ];
    }

    try {
      // Validate the amount that was passed from the client.
      if (!(amount >= MIN_AMOUNT && amount <= MAX_AMOUNT)) {
        throw new Error("Invalid amount.");
      }
      // Create Checkout Sessions from body params.
      const params = {
        payment_method_types: ["card"],
        line_items: line_items,
        client_reference_id: req.body.userId,
        mode:
          frequency === DonationFrequency.Single ? "payment" : "subscription",
        success_url: `${req.headers.origin}/thankyou?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/explore`, // TODO: Change this
        customer: customerId,
        metadata: {
          charityId: charityId,
          userId: userId,
        },
      };
      const checkoutSession = await stripe.checkout.sessions.create(params);

      res.status(200).json(checkoutSession);
    } catch (err) {
      console.log(err);
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
