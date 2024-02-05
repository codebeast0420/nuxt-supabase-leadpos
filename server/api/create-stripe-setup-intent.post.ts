import Stripe from "stripe";

export default defineEventHandler(async (event) => {
    const { stripeSecretKey } = useRuntimeConfig();
    const stripe = new Stripe(stripeSecretKey, null);
    const body = await readBody(event)
    const { customer } = body

    const params: Stripe.SetupIntentCreateParams = {
        customer,
        automatic_payment_methods: {
            enabled: true
        }
    };

    try {
        const setupIntent = await stripe.setupIntents.create(params);

        return setupIntent;
    } catch (error) {
        return {
            status: 500,
            error: error,
        };
    }
});
