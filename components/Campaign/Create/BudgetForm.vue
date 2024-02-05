<template>
    <Heading>{{ $t('campaign_create.budget.title') }}</Heading>
    <!-- TODO: needs improvement https://discord.com/channels/473401852243869706/1168834526127083620/1168834526127083620 -->
    <FormKit type="form" id="campaignCreateBudgetForm" #default="{ value }" @submit="handleSubmit" :actions="false" v-model="formData" >
        <Heading size="small">{{ $t('budget.budget_heading') }}</Heading>
        <div class="flex space-x-4">
            <FormKit type="select" id="type" name="type" validation="required" :options="budgetOptions" />
            <FormKit :ignore="true" type="number" number="integer" id="value_in_euro" name="value_in_euro" validation="required" suffixIcon="<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='w-12 h-12'><path stroke-linecap='round' stroke-linejoin='round' d='M14.25 7.756a4.5 4.5 0 100 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 11-18 0 9 9 0 0118 0z' /></svg>" />
            <FormKit type="hidden" id="value_in_cents" name="value_in_cents" />
        </div>

        <Heading size="small">{{ $t('budget.schedule_heading') }}</Heading>

        <FormKit
            id="start_date"
            type="datepicker"
            :plugins="[stringToDate]"
            :format="{ date: 'medium', time: 'short' }"
            name="start_date"
            :label="$t('budget.start_date')"
            :sequence="['day', 'time']"
            :help="$t('budget.date.your_timezone', { city: userCity })"
            :timezone="browserTimezone"
            :min-date="new Date()"
            picker-only
        />
        <FormKit
            v-if="value ? value.type === 'daily_budget' : false"
            type="checkbox"
            :label="$t('budget.show_end_date')"
            name="show_end_date"
        />
        <FormKit
            v-if="value
                ? (value.show_end_date && value.type === 'daily_budget')
                || value.type === 'lifetime_budget'
                : false"
            :plugins="[stringToDate]"
            type="datepicker"
            name="end_date"
            :label="$t('budget.end_date')"
            :format="{ date: 'medium', time: 'short' }"
            :sequence="['day', 'time']"
            :help="$t('budget.date.your_timezone', { city: userCity })"
            :value-locale="locale"
            :timezone="browserTimezone"
            :min-date="new Date(value ? value.start_date : null)"
            picker-only
        />
    </FormKit>
</template>

<script setup lang="ts">
import { Tables } from "~/types/supabase.types"
import { getNode, FormKitNode } from "@formkit/core";
const { locale } = useI18n()
const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
const userCity = browserTimezone.split('/')[1];

const props = defineProps({
    campaignId: {
        type: Number,
        required: true
    }
})

const { updateCampaignById } = useCampaign()
const { budgetOptions, getInitialState, updateBudget } = useBudget({ campaignId: props.campaignId, isPrefillForm: true })
const formData = ref<Tables<'budget'> | {}>({})

const handleSubmit = async () => {
    try {
        // @ts-ignore
        const { budget_id } = await updateBudget(formData.value)
        return budget_id
    } catch (error) {
        throw createError('Error updating budget')
    }
}

defineExpose({ handleSubmit })

const { data: initialState, pending } = await useAsyncData('budgetInitialState', async () => {
    const initialState = await getInitialState()

    formData.value = initialState

    return initialState
})

watch(pending, (newValue) => {
    if (newValue === false) {
        const valueInCentsNode: FormKitNode | undefined = getNode('value_in_cents')
        const valueInEuroNode: FormKitNode | undefined = getNode('value_in_euro')

        if (!valueInCentsNode || !valueInEuroNode) throw createError('value_in_cents or value_in_euro node not found')

        if (valueInCentsNode.value) {
            valueInEuroNode.input(Number(valueInCentsNode.value) / 100)
        }

        valueInEuroNode.on('input', ({ payload }) => {
            if (payload) {
                const valueInCents = Number(payload) * 100
                valueInCentsNode?.input(valueInCents)
            }
        })
    }
})

const stringToDate = (node: FormKitNode) => {
    node.hook.input((value, next) => next(value ? new Date(value) : null))
}
</script>
