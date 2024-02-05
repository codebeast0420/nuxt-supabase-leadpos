<template>
    <div>
        <div v-if="isDataLoaded">
            <PaymentMethodActionPanel
                :payment-method="paymentMethod"
                :stripe-customer-id="stripe_customer_id"
            />
        </div>
        <div>
            <CardSectionTitle
                :title="$t('billing.subscription.invoices_title')"
                class="-mx-6 border-b border-t mt-12"
            />
            <InvoicesActionPanel :invoices="invoices" />
        </div>
    </div>
</template>

<script setup lang="ts">
import Stripe from 'stripe';
import { ref, onBeforeMount } from 'vue'
const {
    getStripeCustomerPaymentMethod,
    getStripeCustomerSubscription,
    getStripeCustomerInvoices
} = useStripe()
const { getCompany } = useCompany()
const stripe_customer_id = ref(null)
const paymentMethod = ref<Stripe.PaymentMethod | null | undefined>(null)
const subscription = ref<Stripe.Subscription | null | undefined>(null)
const invoices = ref<Stripe.Invoice[] | null | undefined>(null)
const isDataLoaded = ref(false)

onBeforeMount(async () => {
    const { data } = await getCompany('stripe_customer_id')

    if (!data) throw Error('No stripe_customer_id found')

    stripe_customer_id.value = data.stripe_customer_id

    const [paymentMethodData, subscriptionData, invoicesData] = await Promise.all([
        getStripeCustomerPaymentMethod(stripe_customer_id.value),
        getStripeCustomerSubscription(stripe_customer_id.value),
        getStripeCustomerInvoices(stripe_customer_id.value),
    ])

    paymentMethod.value = paymentMethodData
    subscription.value = subscriptionData
    invoices.value = invoicesData.data

    isDataLoaded.value = true
})
</script>


