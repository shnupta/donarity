import { DonationFrequency } from '.prisma/client';
import prisma from 'lib/prisma'

async function averageDonationAmount() {
	const donations = await prisma.donation.findMany({
		where: {
			completed: true,
		},
	})

	var sum = 0;
	donations.forEach(donation => sum += parseFloat(donation.amount.toString()))

	return (sum / donations.length)
}

async function averageSingleDonationAmount() {
	const donations = await prisma.donation.findMany({
		where: {
			completed: true,
			frequency: DonationFrequency.Single,
		},
	})

	var sum = 0;
	donations.forEach(donation => sum += parseFloat(donation.amount.toString()))

	return (sum / donations.length)
}

async function averageSubscriptionAmount() {
	const donations = await prisma.donation.findMany({
		where: {
			completed: true,
			NOT: {
				frequency: DonationFrequency.Single,
			},
		},
	})

	var sum = 0;
	donations.forEach(donation => sum += parseFloat(donation.amount.toString()))

	return (sum / donations.length)
}

async function totalNumberOfDonations() {
	const donations = await prisma.donation.findMany({
		where: {
			completed: true,
		},
	})
	return (donations.length)
}
async function totalNumberOfSingleDonations() {
	const donations = await prisma.donation.findMany({
		where: {
			completed: true,
			frequency: DonationFrequency.Single,
		},
	})
	return (donations.length)
}
async function totalNumberOfSubscriptionDonations() {
	const donations = await prisma.donation.findMany({
		where: {
			completed: true,
			NOT: {
				frequency: DonationFrequency.Single,
			},
		},
	})
	return (donations.length)
}

async function totalNumberOfActiveSubscriptions() {
	const subscriptions = await prisma.subscription.findMany({
		where: {
			active: true,
		},
	})

	return subscriptions.length
}

async function totalMonthlySubscriptionRevenue() {
	const subscriptions = await prisma.subscription.findMany({
		where: {
			frequency: DonationFrequency.Monthly,
			active: true,
		},
	})

	var sum = 0;
	subscriptions.forEach(sub => sum += parseFloat(sub.amount.toString()))

	return sum;
}

async function checkoutAbandonmentRate() {
	const incompleteDonations = await prisma.donation.findMany({
		where: {
			completed: false,
		}
	})

	const incompleteSubscriptions = await prisma.checkoutSession.findMany({
		where: {
			paymentIntentId: null,
			subscriptionId: null,
		}
	})

	const allCheckoutSessions = await prisma.checkoutSession.findMany()

	return (incompleteDonations.length + incompleteSubscriptions.length) / allCheckoutSessions.length
}

export default async function handler(req, res) {
	if (req.method === 'GET') {
		var result = {}
		result.averageDonationAmount = await averageDonationAmount()
		result.averageSingleDonationAmount = await averageSingleDonationAmount();
		result.averageSubscriptionAmount = await averageSubscriptionAmount()
		result.totalNumberOfDonations = await totalNumberOfDonations()
		result.totalNumberOfSingleDonations = await totalNumberOfSingleDonations();
		result.totalNumberOfSubscriptionDonations = await totalNumberOfSubscriptionDonations();
		result.totalNumberOfActiveSubscriptions = await totalNumberOfActiveSubscriptions();
		result.totalMonthlySubscriptionRevenue = await totalMonthlySubscriptionRevenue();
		result.checkoutAbandonmentRate = await checkoutAbandonmentRate();

		res.status(200).json(result)
		
	} else {
		res.setHeader("Allow", "GET");
    res.status(405).end("Method Not Allowed");
	}
}