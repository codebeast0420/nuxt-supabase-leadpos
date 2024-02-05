import Stripe from "stripe";

export default defineEventHandler(async () => {
    const { stripeSecretKey } = useRuntimeConfig();
    const stripe = new Stripe(stripeSecretKey, null);

    const price = await stripe.prices.retrieve(
        'price_1NjgaCEQTxIQh7eRcktUwWe2'
    );

    return price
});
