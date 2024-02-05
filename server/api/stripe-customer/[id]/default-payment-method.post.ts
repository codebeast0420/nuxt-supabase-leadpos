import Stripe from "stripe";

export default defineEventHandler(async (event) => {
    const { stripeSecretKey } = useRuntimeConfig();
    const stripe = new Stripe(stripeSecretKey, null);
    const body = await readBody(event)
    const { paymentMethodId } = body
    const customerId = event.context.params!.id

    const updatedCustomer = await stripe.customers.update(customerId, {
        invoice_settings: {
            default_payment_method: paymentMethodId,
        },
    });

    if (!updatedCustomer) throw Error('No customer returned from server')

    return updatedCustomer
})
