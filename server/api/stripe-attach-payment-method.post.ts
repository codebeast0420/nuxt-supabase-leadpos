import Stripe from "stripe";

export default defineEventHandler(async (event) => {
    const { stripeSecretKey } = useRuntimeConfig();
    const stripe = new Stripe(stripeSecretKey, null);
    const body = await readBody(event)
    const { customerId, paymentMethodId } = body

    const paymentMethod = await stripe.paymentMethods.attach(paymentMethodId, {
        customer: customerId,
    });

    if (!paymentMethod) throw Error('No paymentMethod returned from server')

    return paymentMethod
})
