import { DonationFrequency } from '@prisma/client'
import prisma from '../../lib/prisma'
import { getSession } from 'next-auth/client'

// POST /api/donate
// Required fields in body: frequency, amount , charityId
// Optional fields in body: userId
export default async function handler(req, res) {
  if (req.method != "POST") {
    res.status(405).json({text: 'Method not allowed. Must be POST.'})
    return
  }

  /*
  // Example of how to only allow authenticated requests
  const session = await getSession({ req })

  if (!session) {
    res.status(401).json({text: "You must be authenticated to use this endpoint."})
  }
  */

  const { frequency, amount, charityId, userId } = req.body

  const result = await prisma.donation.create({
    data: {
      frequency: frequency,
      amount: amount,
      charityId: charityId,
      userId: userId
    }
  })

  // TODO: Look at result and do something nicer if it fails?

  res.json(result)
}