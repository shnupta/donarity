import prisma from 'lib/prisma'

async function totalAmountReceived(id) {
	const donations = await prisma.donation.findMany({
		where: {
			completed: true,
			charityId: id,
		}
	})

	var sum = 0;
	donations.forEach(donation => sum += parseFloat(donation.amount.toString()))

	return sum;
}

export default async function handler(req, res) {
	if (req.method === "GET") {
		const charityId = req.query.id
		var result = {}
		result.totalAmountReceived = await totalAmountReceived(charityId)

		res.status(200).json(result)

	} else {
		res.setHeader("Allow", "GET")
		res.status(405).end("Method Not Allowed")
	}
}