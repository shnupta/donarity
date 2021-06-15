import { getServerStripe } from "lib/serverStripe";
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

async function handlePut(subscriptions) {}

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
