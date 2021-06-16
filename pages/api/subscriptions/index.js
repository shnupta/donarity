import { getServerStripe } from "lib/serverStripe";
import { DonationFrequency } from '@prisma/client'
import prisma from "lib/prisma";

const stripe = getServerStripe();

async function handleDelete(subscriptions) {
  for (var i in subscriptions) {
		const subscription = subscriptions[i]
    const res = await stripe.subscriptions.del(subscription.subscriptionId);

    // For now
    const deactivatedSub = await prisma.subscription.update({
      where: {
        subscriptionId: subscription.subscriptionId,
      },
      data: {
        active: false,
      },
    });
  }
}

// Delete the old 0th price of the subscripiton. Create a new one and update the subscription
// Subscriptions is a map with keys of subscriptionId
async function handlePut(subscriptions) {
	for (var i in subscriptions) {
		const subscription = subscriptions[i][1]
		const newPrice = await stripe.prices.create({
			unit_amount: parseFloat(subscription.amount) * 100,
			currency: "gbp",
			recurring: {
				interval: subscription.frequency === DonationFrequency.Monthly ? "month" : "year",
			},
			product:
				subscription.frequency === DonationFrequency.Monthly
					? process.env.MONTHLY_PRODUCT_ID
					: process.env.ANNUAL_PRODUCT_ID,
		});

		const currentSubscription = await stripe.subscriptions.retrieve(subscription.subscriptionId)
		const updatedSubscriptionItem = await stripe.subscriptions.update(currentSubscription.id, {
			cancel_at_period_end: false,
			proration_behavior: 'none',
			items: [{
				id: currentSubscription.items.data[0].id,
				price: newPrice.id
			}]
		})


		const updatedDbSub = await prisma.subscription.update({
			where: {
				subscriptionId: subscription.subscriptionId,
			},
			data: {
				amount: subscription.amount
			}
		})
	}
}

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    await handleDelete(req.body);
    res.status(200).end("All good");
  } else if (req.method === "PUT") {
    await handlePut(req.body);
    res.status(200).end("All good");
  } else {
    res.setHeader("Allow", "POST, PUT");
    res.status(405).end("Method Not Allowed");
  }
}
