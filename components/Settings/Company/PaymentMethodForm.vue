<template>
    <FormKit id="SettingsCompanyPaymentMethodForm" type="form" @submit="handleSubmit"
        :submit-label="$t('form.save_changes')">
        <div id="payment-element"></div>
    </FormKit>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import Stripe from 'stripe'
import { Stripe as StripeClient, loadStripe, StripeElement, StripeElements } from '@stripe/stripe-js';

const stripe = ref<StripeClient | null>(null);
const elements = ref<StripeElements | null>(null);
const paymentElement = ref<StripeElement | null>(null);
let clientSecret: string | null = null;
const {
    attachStripeCustomerPaymentMethod,
    updateStripeCustomerDefaultPaymentMethod
} = useStripe()

const { paymentMethod, customerId } = defineProps({
    paymentMethod: {
        type: Object as () => Stripe.PaymentMethod,
        required: true,
    },
    customerId: {
        type: String,
        required: true,
    },
})

const initStripe = async () => {
    const stripeInstance = await loadStripe(useRuntimeConfig().public.stripePublicKey as string);
    if (!stripeInstance) {
        console.error('Stripe failed to initialize');
        return;
    }
    stripe.value = stripeInstance;

    const setupIntent = await $fetch<Stripe.SetupIntent>('/api/create-stripe-setup-intent', {
        method: 'post',
        body: {
            customerId
        },
    });
    clientSecret = setupIntent.client_secret;

    const elementsInstance = stripe.value.elements({ clientSecret });
    if (!elementsInstance) {
        console.error('Stripe Elements failed to initialize');
        return;
    }
    elements.value = elementsInstance;

    mountStripePaymentElement();
};

const mountStripePaymentElement = () => {
    if (!elements.value) {
        console.error('Stripe Elements not loaded');
        return;
    }

    paymentElement.value = elements.value.create('payment');

    if (!paymentElement.value) {
        console.error('Failed to create payment element');
        return;
    }

    paymentElement.value.mount('#payment-element');
};

onMounted(initStripe);

const handleSubmit = async (form: any) => {
    try {
        if (!customerId) throw Error('No customer ID')
        if (!clientSecret) throw Error('No client secret')

        const { error, setupIntent } = await stripe.value!.confirmSetup({
            // @ts-ignore
            elements: elements.value,
            // @ts-ignore
            redirect: 'if_required'
        })

        if (error) {
            console.error(error)
            return;
        }

        // @ts-ignore
        const payment_method = setupIntent?.payment_method || null

        const attachPaymentMethodRes = await attachStripeCustomerPaymentMethod(customerId, payment_method);

        if (!attachPaymentMethodRes) {
            console.error('Failed to attach payment method');
            return;
        }

        const updatedCustomer = await updateStripeCustomerDefaultPaymentMethod(customerId, attachPaymentMethodRes.id);

        if (!updatedCustomer) {
            console.error('Failed to update default payment method');
            return;
        }
    } catch (error) {
        console.error(error)
    }

};
</script>
