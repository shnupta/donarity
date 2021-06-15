import { getServerStripe } from "lib/serverStripe";
import { getSession } from "next-auth/client";

export default async function handler(req, res) {
	// const session = await getSession(req)
	// console.log(session)
	const stripe = getServerStripe()
	const pis = await stripe.paymentIntents.list({
		customer: 'cus_JfZ2zfzvalxIrO' 
	})

	res.status(200).json(pis)
}