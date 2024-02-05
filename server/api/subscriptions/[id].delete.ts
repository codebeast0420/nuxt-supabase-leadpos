import Stripe from "stripe";

export default defineEventHandler(async (event): Promise<Stripe.Subscription> => {
    const subscriptionId = event.context.params!.id
    const { stripeSecretKey } = useRuntimeConfig();
    const stripe = new Stripe(stripeSecretKey, null);

    const deleted = await stripe.subscriptions.cancel(subscriptionId);

    if (!deleted) throw Error('No subscription returned from server')

    return deleted
})
