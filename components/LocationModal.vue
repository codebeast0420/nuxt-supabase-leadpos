<template>
    <Modal :title="$t('modal.title.create_location')" :isOpen="isLocationModalOpen">
        <FormKit
            type="multi-step"
            tab-style="progress"
            :allow-incomplete="false"
            :before-step-change="async ({ currentStep, targetStep }) => {
                const error = await handleOnBeforeStepChange({ currentStep, targetStep })


                if (error) {
                    console.error(error)
                    return false
                }

                // Change to false to block all step changes
                return true
            }
            "
        >
            <template #badge></template>
            <FormKit type="step" :label="$t('locationGeneralForm')" id="locationGeneralForm">
                <LocationGeneralForm ref="locationGeneralForm" />
                <template #stepNext="{ handlers, node }">
                    <Button
                        type="submit"
                        @click="handlers.incrementStep(1)()"
                        full
                    >{{ $t('location.form.next_step') }}</Button>
                </template>
            </FormKit>

            <FormKit type="step" :label="$t('locationTargetAreaForm')" id="locationTargetAreaForm">
                <template #stepPrevious></template>
                <LocationTargetAreaForm ref="locationTargetAreaForm" />
                <template #stepNext="{ handlers, node }">
                    <Button
                        type="submit"
                        @click="handlers.incrementStep(1)()"
                        full
                    >{{ $t('location.form.next_step') }}</Button>
                </template>
            </FormKit>

            <FormKit type="step" :label="$t('locationTargetAudienceForm')" id="locationTargetAudienceForm">
                <template #stepPrevious></template>
                <LocationTargetAudienceForm
                    ref="locationTargetAudienceForm"
                    context="location"
                    :options="targetAudienceOptions"
                >
                    <Button
                        type="submit"
                        full
                    >{{ $t('location.form.next_step') }}</Button>
                </LocationTargetAudienceForm>
            </FormKit>
        </FormKit>
    </Modal>
</template>

<script lang="ts" setup>
import { TargetAudienceOptions } from '~/types/campaign'

const isLocationModalOpen = useState('isLocationModalOpen', () => true)
const location_id = useUserStore().location?.location_id

const targetAudienceOptions = ref<TargetAudienceOptions>({
    isPrefillForm: true,
    locationId: location_id
})

const locationGeneralForm = ref()
const locationTargetAreaForm = ref()
const locationTargetAudienceForm = ref()

const handleOnBeforeStepChange = async ({ currentStep, targetStep }) => {
    if (targetStep.stepIndex < currentStep.stepIndex) return

    let hasError = false

    if (!currentStep.isValid) return { error: true }

    switch (currentStep.id) {
        case 'locationGeneralForm':
            try {
                await locationGeneralForm.value.handleSubmit();
            } catch (error) {
                hasError = true
            }
            return hasError

        case 'locationTargetAreaForm':
            try {
                await locationTargetAreaForm.value.handleSubmit();
            } catch (error) {
                hasError = true
            }
            return hasError

        case 'locationTargetAudienceForm':
            try {
                await locationTargetAudienceForm.value.handleSubmit();
            } catch (error) {
                hasError = true
            }

            return hasError

        default:
            throw Error('Unknown step name')
    }
}

</script>
