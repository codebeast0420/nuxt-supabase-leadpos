<template>
    <!-- TODO: temp fix:

        https://discord.com/channels/473401852243869706/1163655613843259452
        https://github.com/formkit/formkit/issues/1002
    -->
    <ClientOnly>
        <FormKit
            @node="(node) => (multiStepNode = node)"
            id="campaignCreateFormMultistep"
            type="multi-step"
            tab-style="progress"
            :allow-incomplete="context === 'create' ? false : true"
            :classes="{ wrapper: '!max-w-none' }"
            :before-step-change="handleOnBeforeStepChange">
        <template #badge></template>
        <div class="flex items-start space-x-4">
            <Card size="auto" class="grow">
                <FormKit type="step" :label="$t(CAMPAIGN_CREATE_BUDGET_ID)" :id="CAMPAIGN_CREATE_BUDGET_ID" name="budget">
                    <CampaignCreateBudgetForm
                        v-if="context === 'edit'"
                        :ref="CAMPAIGN_CREATE_BUDGET_ID"
                        :campaign-id="campaignId" />
                    <template #stepPrevious></template>
                    <template #stepNext="{ handlers, node }">
                        <div class="flex justify-end space-x-4 w-full mt-5">
                            <Button variant="light" @click="handlers.previous()">{{ $t('multistep.previous_step') }}</Button>
                            <Button @click="handlers.next()">{{ $t('form.save_changes') }}</Button>
                        </div>
                    </template>
                </FormKit>
                <FormKit type="step" :label="$t(CAMPAIGN_CREATE_DETAILS_ID)" :id="CAMPAIGN_CREATE_DETAILS_ID" name="details">
                    <CampaignCreateDetailsForm
                        v-if="campaignTemplate"
                        :ref="CAMPAIGN_CREATE_DETAILS_ID"
                        :campaign-id="campaignId"
                        :initial-state="campaignTemplate" />
                    <template #stepNext="{ handlers, node }">
                        <div class="flex justify-end space-x-4 w-full mt-5">
                            <Button variant="light" :to="CAMPAIGNS_OVERVIEW">{{ $t('multistep.previous_step') }}</Button>
                            <Button @click="handlers.next()">{{ $t('form.save_changes') }}</Button>
                        </div>
                    </template>
                </FormKit>
                <FormKit type="step" :label="$t(CAMPAIGN_CREATE_TARGET_GROUP_ID)" :id="CAMPAIGN_CREATE_TARGET_GROUP_ID" name="target_group">
                    <LocationTargetAudienceForm
                        v-if="context === 'edit'"
                        :ref="CAMPAIGN_CREATE_TARGET_GROUP_ID"
                        context="campaign"
                        :options="targetAudienceOptions"
                    />
                    <template #stepPrevious></template>
                    <template #stepNext="{ handlers, node }">
                        <div class="flex justify-end space-x-4 w-full mt-5">
                            <Button variant="light" @click="handlers.previous()">{{ $t('multistep.previous_step') }}</Button>
                            <Button @click="handlers.next()">{{ $t('form.save_changes') }}</Button>
                        </div>
                    </template>
                </FormKit>
                <FormKit type="step" :label="$t(CAMPAIGN_CREATE_TARGET_LOCATION_ID)" :id="CAMPAIGN_CREATE_TARGET_LOCATION_ID" name="targetLocation">
                    <LocationTargetAreaForm
                            v-if="context === 'edit'"
                            :ref="CAMPAIGN_CREATE_TARGET_LOCATION_ID"
                            context="campaign"
                            :options="targetAreaOptions"
                        />
                        <template #stepPrevious></template>
                        <template #stepNext="{ handlers, node }">
                            <div class="flex justify-end space-x-4 w-full mt-5">
                                <Button variant="light" @click="handlers.previous()">{{ $t('multistep.previous_step') }}</Button>
                                <Button @click="handlers.next()">{{ $t('form.save_changes') }}</Button>
                            </div>
                        </template>
                </FormKit>
                <FormKit type="step" :label="$t(CAMPAIGN_CREATE_LEAD_FORM_ID)" :id="CAMPAIGN_CREATE_LEAD_FORM_ID">
                </FormKit>
            </Card>
            <CampaignTemplatePreview v-if="campaignTemplate" :template="campaignTemplate" />
        </div>
        </FormKit>
    </ClientOnly>
</template>

<script setup lang="ts">
import { CAMPAIGNS_OVERVIEW, CREATE_NEW_CAMPAIGN_DETAIL_EDIT } from '~/constants/routes'
import { TargetAudienceOptions, TargetAreaOptions } from '~/types/campaign'
const CAMPAIGN_CREATE_DETAILS_ID = 'campaignCreateDetails'
const CAMPAIGN_CREATE_TARGET_GROUP_ID = 'campaignCreateTargetGroup'
const CAMPAIGN_CREATE_BUDGET_ID = 'campaignCreateBudget'
const CAMPAIGN_CREATE_TARGET_LOCATION_ID = 'campaignCreateTargetLocation'
const CAMPAIGN_CREATE_LEAD_FORM_ID = 'campaignCreateLeadForm'
import { FormKitNode } from "@formkit/core";

const supabase = useSupabaseClient()
const route = useRoute()
const multiStepNode = ref<FormKitNode | undefined>(undefined)

const props = defineProps({
    context: {
        type: String as PropType<'create' | 'edit'>,
        required: true
    }
})

// let child components use context
provide('context', props.context)

const campaignId = computed((): number | undefined => {
    if (props.context === 'create') return undefined

    return Number(route.params.campaignId)
})

const targetAudienceOptions = ref<TargetAudienceOptions>({
    isPrefillForm: true,
    campaignId: campaignId.value
})

const targetAreaOptions = ref<TargetAreaOptions>({
    isPrefillForm: true,
    campaignId: campaignId.value
})

const { data: campaignTemplate, refresh } = await useAsyncData(`campaignTemplateWithId${route.params.campaignTemplateId}`, async () => {
    const { data, error } = await supabase.from('campaign_template')
        .select('*')
        .eq('campaign_template_id', route.params.campaignTemplateId)
        .single()

    if (error) {
        console.error(error)
    }

    if (!data) return

    return data
})

const campaignCreateDetails = ref()
const campaignCreateTargetGroup = ref()
const campaignCreateBudget = ref()
const campaignCreateTargetLocation = ref()
const campaignCreateLeadForm = ref()

const handleOnBeforeStepChange = async ({ currentStep, targetStep, delta }) => {
    if (Math.sign(delta) === -1) return true;

    switch (currentStep.id) {
        case 'campaignCreateDetails':
            try {
                const { campaign_id, campaign_template_id } = await campaignCreateDetails.value.handleSubmit();

                if (props.context === 'create') {
                    return navigateTo(`${CREATE_NEW_CAMPAIGN_DETAIL_EDIT
                        .replace(':campaignTemplateId', campaign_template_id)
                        .replace(':campaignId', campaign_id)}`)
                }
            } catch (error) {
                return false
            }
            return true

        case 'campaignCreateTargetGroup':
            try {
                await campaignCreateTargetGroup.value.handleSubmit();
            } catch (error) {
                return false
            }
            return true

        case 'campaignCreateTargetLocation':
            try {
                await campaignCreateTargetLocation.value.handleSubmit();
            } catch (error) {
                return false
            }

            return true

        case 'campaignCreateBudget':
            try {
                await campaignCreateBudget.value.handleSubmit();
            } catch (error) {
                return false
            }

            return true

        case 'campaignCreateLead':
            try {
                await campaignCreateLeadForm.value.handleSubmit();
            } catch (error) {
                return false
            }

            return true

        default:
            console.error('Unknown step')
            return false

    }
}
</script>
