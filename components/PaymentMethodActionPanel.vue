<template>
    <ActionPanel
        :title="$t('billing.payment_method.title')"
        :description="$t(`billing.payment_method.type.${paymentMethod.type}`)"
        :additionalInfo="$t(`billing.brand.${paymentMethod.card?.brand}`) + ' ' + $t('billing.type.ending_in') + ' ' + paymentMethod.card!.last4"
        @click="showModal = true"
    />
    <Modal
        :is-open.sync="showModal" @update:isOpen="showModal = $event"
        :title="$t('billing.payment_method.title')"
    >
        <SettingsCompanyPaymentMethodForm
            v-if="paymentMethod && stripeCustomerId"
            :payment-method="paymentMethod"
            :customer-id="stripeCustomerId"
        />
    </Modal>
</template>

<script setup lang="ts">
import Stripe from 'stripe'
const showModal = ref(false)

defineProps({
    paymentMethod: {
        type: Object as PropType<Stripe.PaymentMethod>,
        required: true
    },
    stripeCustomerId: {
        type: String,
        required: true
    },
})
</script>
