<template>
    <div class="divide-y divide-gray-200">
        <ActionPanel
            v-for="invoice in invoices"
            class="py-3"
            :title="formatUnixTimestamp(invoice.created)"
            :description="`${$t(`invoice.status.${invoice.status}`)} · ${formatCurrency(invoice.total, invoice.currency)}`"
            :cta-label="$t('billing.invoices.view_invoice')"
            @click="openInvoice(invoice.hosted_invoice_url!)"
        />
    </div>
</template>

<script setup lang="ts">
import Stripe from 'stripe'
const { formatUnixTimestamp, formatCurrency } = useUtils()

defineProps({
    invoices: {
        type: Array as PropType<Stripe.Invoice[]>,
        required: true
    }
})

const openInvoice = (invoiceUrl: string) => {
    if (process.client) {
        window.open(invoiceUrl, '_blank');
    }
}
</script>
