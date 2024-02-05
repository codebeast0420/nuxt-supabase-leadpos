<template>
    <ActionPanel
        :title="$t('billing.current_plan.title')"
        :description="product.name"
        :additional-info="additionalInfo"
        :ctaLabel="$t('billing.current_plan.cancel')"
        @click="showModal = true"
    />
    <Modal
        :is-open.sync="showModal" @update:isOpen="showModal = $event"
        :title="$t('billing.current_plan.cancel')"
        :show-ok-button="true"
        :show-cancel-button="true"
        variant="danger"
        :is-loading="isLoading"
        @ok="cancelSubscription"

    >
        <p class="text-muted">{{ $t('billing.current_plan.cancel') }}</p>
    </Modal>
</template>

<script setup lang="ts">
import Stripe from 'stripe';
const { isTrialActive } = useStripe()
const { formatCurrency, formatUnixTimestamp } = useUtils()
const { t } = useI18n()

const showModal = ref(false);
const isLoading = ref(false)

const { subscription, product } = defineProps({
    subscription: {
        type: Object as PropType<Stripe.Subscription>,
        required: true
    },
    product: {
        type: Object as PropType<Stripe.Product>,
        required: true
    }
})

const additionalInfo = computed(() => {
    const trialActive = isTrialActive(subscription)
    const priceFormatted = formatCurrency(subscription.plan.amount, subscription.plan.currency)

    if (trialActive) {
        return `${t('billing.current_plan.free_trial')} · ${t('billing.current_plan.free_trial.after_that', { price: priceFormatted, interval: t(`billing.current_plan.interval.${subscription.plan.interval}`) })}`
    } else {
        return `${priceFormatted} ${t(`billing.current_plan.interval.${subscription.plan.interval}`)}<br>${t('billing.current_plan.next_payment_on')} ${formatUnixTimestamp(subscription.current_period_end)}`
    }
})

// TODO: https://linear.app/newwwagency/issue/LEA-11/user-can-cancel-monthly-within-the-application
const cancelSubscription = async () => {
    isLoading.value = true
    setTimeout(() => {
        isLoading.value = false
        showModal.value = false
    }, 3000);
    console.log('cancel subscription')
}
</script>
