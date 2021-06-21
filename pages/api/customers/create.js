import prisma from "lib/prisma";
import { getServerStripe } from "lib/serverStripe";

export default async function handler(req, res) {
  const stripe = getServerStripe();
  if (req.method === "POST") {
    const { user } = req.body;

    const customer = await stripe.customers.create({
      email: user.email,
      metadata: {
        userId: user.id
      }
    })

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        stripeCustomerId: customer.id
      }
    })

    res.status(200).json(customer)

  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
