import Stripe from "stripe";

export default defineEventHandler(async (event) => {
    const { stripeSecretKey } = useRuntimeConfig();
    const stripe = new Stripe(stripeSecretKey, null);
    const body = await readBody(event)
    const { email, preferred_locales } = body

    const customer = await stripe.customers.create({
        email,
        preferred_locales
    })

    return customer
});
