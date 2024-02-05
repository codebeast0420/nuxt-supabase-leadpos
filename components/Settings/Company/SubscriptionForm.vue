<template>
    <div v-if="isDataLoaded">
        <SubscriptionActionPanel
            :subscription="subscription"
            :product="product"
        />
    </div>
</template>

<script setup lang="ts">
import Stripe from 'stripe';
import { ref, onBeforeMount } from 'vue'
const { getStripeCustomerSubscription, getStripeProduct } = useStripe()
const { getCompany } = useCompany()
const stripe_customer_id = ref(null)
const subscription = ref<Stripe.Subscription | null | undefined>(null)
const product = ref<Stripe.Product | null | undefined>(null)
const isDataLoaded = ref(false)

onBeforeMount(async () => {
    const { data } = await getCompany('stripe_customer_id')

    if (!data) throw Error('No stripe_customer_id found')

    stripe_customer_id.value = data.stripe_customer_id

    subscription.value = await getStripeCustomerSubscription(stripe_customer_id.value)

    if (!subscription.value) throw Error('No Stripe subscription was returned')

    product.value = await getStripeProduct(subscription.value.plan.product)

    if (!product.value) throw Error('No Stripe product was returned')

    isDataLoaded.value = true
})
</script>
