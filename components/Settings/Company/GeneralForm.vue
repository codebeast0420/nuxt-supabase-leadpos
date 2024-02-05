<template>
<div>
    <FormKit id="SettingsCompanyGeneralForm" type="form" @submit="handleSubmit" :submit-label="$t('form.save_changes')">
        <FormKit
            type="text"
            id="company_name"
            name="company_name"
            :label="$t('form.payment_method.company_name')"
            validation="required"
        />
        <div id="address-element" class="mb-5"></div>
    </FormKit>
</div>
</template>

<script lang="ts" setup>
import { Stripe as StripeClient, loadStripe, StripeElement, StripeElements } from "@stripe/stripe-js";
import { getNode } from "@formkit/core";

const stripe = ref<StripeClient | null>(await loadStripe(useRuntimeConfig().public.stripePublicKey as string))
const elements = ref<StripeElements | null>(stripe.value!.elements())
const addressElement = ref<StripeElement | null>(null)
const { getStripeCustomer, updateStripeCustomer } = useStripe()
const { getCompany, updateCompany } = useCompany()
const company = ref(null)

useAsyncData('company', async () => {
    const { data } = await getCompany('stripe_customer_id, name')
    company.value = data
    prefillCompanyName()
    await mountStripeAddressElement()
})

const mountStripeAddressElement = async () => {
    if (!elements.value) throw Error('Stripe Elements not loaded')

    const customer = await getStripeCustomerData()

    addressElement.value = elements.value.create('address', {
        mode: 'billing',
        defaultValues: {
            name: customer?.name,
            address: customer?.address
        }
    });

    addressElement.value.mount('#address-element')
}

const getStripeCustomerData = async () => {
    try {
        if (!company?.value.stripe_customer_id) throw Error('No Stripe Customer ID')

        const customer = await getStripeCustomer(company.value.stripe_customer_id)

        return customer
    } catch (error) {
        console.error('error', error)
    }
}

const prefillCompanyName = () => {
    if (!company?.value.name) throw Error('No Company name')

    getNode('company_name')?.input(company.value.name)
}

const handleSubmit = async (form: any) => {
    const addressElement = elements.value!.getElement('address');
    const { complete, value } = await addressElement!.getValue();

    if (complete) {
        const updateCompanyPromise = updateCompany({ name: form.company_name });
        const updateStripeCustomerPromise = updateStripeCustomer(
            company!.value!.stripe_customer_id,
            value.name,
            value.address,
            company!.value!.name
        );

        await Promise.all([updateCompanyPromise, updateStripeCustomerPromise]);
    }
};

</script>
