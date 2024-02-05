import Stripe from "stripe";

export default defineEventHandler(async (event): Promise<Stripe.PaymentMethod> => {
    const customerId = event.context.params!.id
    const { stripeSecretKey } = useRuntimeConfig();
    const stripe = new Stripe(stripeSecretKey, null);

    const paymentMethods = await stripe.paymentMethods.list({
        customer: customerId,
        type: 'card',
    });

    if (!paymentMethods.data.length || !paymentMethods?.data) throw Error('No payment methods returned from server')

    const paymentMethod = paymentMethods.data[0];

    return paymentMethod
})
