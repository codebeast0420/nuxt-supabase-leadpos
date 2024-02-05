import Stripe from "stripe";

export default defineEventHandler(async (event) => {
    const { stripeSecretKey } = useRuntimeConfig();
    const stripe = new Stripe(stripeSecretKey, null);
    const body = await readBody(event)
    const { paymentMethod } = body
    const customerId = event.context.params!.id

    const paymentMethodResponse = await stripe.paymentMethods.attach(paymentMethod, {
        customer: customerId,
    });

    if (!paymentMethodResponse) throw Error('No paymentMethod returned from server')

    return paymentMethodResponse
})
