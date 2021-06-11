import prisma from "lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { sessionId, userId, charityId, amount, frequency } = req.body;
    let newCheckoutSession
    try {
      newCheckoutSession = await prisma.checkoutSession.create({
        data: {
          sessionId: sessionId,
          userId: userId,
          charityId: charityId,
          completed: false,
          amount: amount,
          donationFrequency: frequency
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).end(err)
    }

    res.status(200).json(newCheckoutSession);
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
