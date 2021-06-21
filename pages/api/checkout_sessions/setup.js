import prisma from "lib/prisma";
import { getServerStripe } from "lib/serverStripe";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userId, stripeCustomerId } = req.body;
		const stripe = getServerStripe()

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			mode: 'setup',
			customer: stripeCustomerId,
			client_reference_id: userId,
			success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/manage`,
			cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/manage`,
		})

		res.status(200).json(session)
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
