import { getServerStripe } from "lib/stripe";

const MIN_AMOUNT = 0.3
const MAX_AMOUNT = 100_000

const stripe = getServerStripe();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const amount = req.body.amount;
        try {
          // Validate the amount that was passed from the client.
          if (!(amount >= MIN_AMOUNT && amount <= MAX_AMOUNT)) {
            throw new Error('Invalid amount.');
          }
          // Create Checkout Sessions from body params.
          const params = {
            payment_method_types: ['card'],
            line_items: [
              {
                price_data: {
                    currency: 'gbp',
                    product_data: {
                        name: 'Donation',
                    },
                    unit_amount: amount * 100,
                },
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: `${req.headers.origin}/thankyou?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin}/explore`, // TODO: Change this
          };
          const checkoutSession = await stripe.checkout.sessions.create(
            params
          );
    
          res.status(200).json(checkoutSession);
        } catch (err) {
          console.log(err)
          res.status(500).json({ statusCode: 500, message: err.message });
        }
      } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
      }
}