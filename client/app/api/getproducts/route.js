import { redirect } from 'next/dist/server/api-utils';
import { NextResponse } from 'next/server';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 'price_1NkIgFJcp39E8XWwkYWvmXk3',
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `http://localhost:3000/?success=true`,
        cancel_url: `http://localhost:3000/?canceled=true`,
        payment_method_types: ['card'],
      });
      return NextResponse.redirect(session.url, {status: 303});
    } catch (err) {
      return NextResponse.json(err.message, {status: 500})
    }
  } else {
    NextResponse.setHeader('Allow', 'POST');
    return NextResponse.json('Method Not Allowed', {status: 405});
}
}