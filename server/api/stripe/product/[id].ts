import Stripe from "stripe";

export default defineEventHandler(async (event): Promise<Stripe.Response<Stripe.Product>> => {
    const productId = event.context.params!.id
    const { stripeSecretKey } = useRuntimeConfig();
    const stripe = new Stripe(stripeSecretKey, null);

    const product = await stripe.products.retrieve(productId)

    if (!product) throw Error('No product returned from server')

    return product
})
