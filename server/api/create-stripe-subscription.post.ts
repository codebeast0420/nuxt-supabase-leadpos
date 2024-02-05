import Stripe from "stripe";

export default defineEventHandler(async (event) => {
    const { stripeSecretKey } = useRuntimeConfig();
    const stripe = new Stripe(stripeSecretKey, null);
    const body = await readBody(event)
    const { customerId, price, paymentMethod } = body

    const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [
            {
                price,
            },
        ],
        trial_period_days: 14,
        default_payment_method: paymentMethod
    });

    if (!subscription) throw Error('No subscription returned from server')

    return subscription
})
