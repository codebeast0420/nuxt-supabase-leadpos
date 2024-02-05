import Stripe from "stripe";

export default defineEventHandler(async (event): Promise<Stripe.Response<Stripe.Customer>> => {
    const customerId = event.context.params!.id
    const { stripeSecretKey } = useRuntimeConfig();
    const stripe = new Stripe(stripeSecretKey, null);
    const body = await readBody(event)
    const { name, address, companyName } = body

    const customer = await stripe.customers.update(customerId, {
        name,
        address,
        invoice_settings: {
            custom_fields: [
                {
                    name: 'Firma',
                    value: companyName
                }
            ]
        }
    })

    if (!customer) throw Error('No customer returned from server')

    return customer
})
