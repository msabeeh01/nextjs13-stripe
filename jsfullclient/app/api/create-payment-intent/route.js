import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (items) => {
  //calculate price of items
  //! has to be greater than 100
  return 100 ;
};

/**
 * Generate a PaymentIntent and return the client secret.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {Array} req.body.items - The list of items.
 * @return {Object} The response object with the client secret.
 */
export async function POST(req) {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "cad",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return NextResponse.json({clientSecret: paymentIntent.client_secret})
};