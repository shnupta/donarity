import prisma from '../../lib/prisma'

// POST /api/donation
// Required fields in body: frequency, amount , charityId
// Optional fields in body: userId
export default async function handler(req, res) {
  if (req.method != "POST") {
    res.status(405).json({text: 'Method not allowed. Must be POST.'})
  }
  const { frequency, amount, charityId, userId } = req.body
  const result = null
}