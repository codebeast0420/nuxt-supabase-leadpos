import Stripe from "stripe";

export default defineEventHandler(async (event): Promise<Stripe.PaymentMethod> => {
    const customerId = event.context.params!.id
    const body = await readBody(event)
    const { clientSecret, paymentMethodId } = body
    const { stripeSecretKey } = useRuntimeConfig();
    const stripe = new Stripe(stripeSecretKey, null);

    if (!customerId || !paymentMethodId) {
        throw Error('Missing customerId or paymentMethodId')
    }

    const paymentMethod = await stripe.paymentMethods.update(paymentMethodId)

    console.log('paymentMethod from Server', paymentMethod)

    if (!paymentMethod) throw Error('No payment method returned from Stripe')

    // const paymentMethod = await stripe.paymentMethods.attach(paymentMethodId, {
    //     customer: customerId,
    // });

    // if (!paymentMethod) throw Error('No payment method returned from Stripe')

    // const updatedCustomer = await stripe.customers.update(customerId, {
    //     invoice_settings: {
    //         default_payment_method: paymentMethodId,
    //     },
    // });

    // if (!updatedCustomer) throw Error('No customer returned from Stripe')

    return paymentMethod
})
