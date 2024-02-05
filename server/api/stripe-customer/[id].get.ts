
export default defineEventHandler(async (event): Promise<Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>> => {
    const customerId = event.context.params!.id
    const { stripeSecretKey } = useRuntimeConfig();
    const stripe = new Stripe(stripeSecretKey, null);

    const customer = await stripe.customers.retrieve(customerId)

    if (!customer) throw Error('No customer returned from server')

    return customer
})
