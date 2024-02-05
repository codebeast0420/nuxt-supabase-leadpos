import Stripe from "stripe";

export default defineEventHandler(async (event): Promise<Stripe.Subscription> => {
    const customerId = event.context.params!.id
    const { stripeSecretKey } = useRuntimeConfig();
    const stripe = new Stripe(stripeSecretKey, null);

    const subscriptions = await stripe.subscriptions.list({
        customer: customerId
    });

    if (!subscriptions.data.length || !subscriptions?.data) throw Error('No subscriptions returned from server')

    const subscription = subscriptions.data[0];

    return subscription
})
