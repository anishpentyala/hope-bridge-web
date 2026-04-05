import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { amount } = req.body;
  const parsedAmount = Number(amount);

  if (!parsedAmount || parsedAmount < 1 || !Number.isFinite(parsedAmount)) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'HopeBridge Donation',
              description: 'Supporting Asian American teen mental health in King County, WA',
            },
            unit_amount: Math.round(parsedAmount * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `https://hopebridgeservices.org/DonateSuccess?amount=${parsedAmount}`,
      cancel_url: 'https://hopebridgeservices.org/Donate',
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error.message);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
}
