<template>
    <client-only>
        <StepProgress :active-step-key="stepKey"/>
        <div class="grid grid-cols-2 gap-4 min-h-screen justify-items-center">
            <div class="col-span-1 border-r flex w-full justify-center">
                <div class="w-full max-w-md pt-20">
                    <div class="mb-10">
                        <Heading class="mb-3" size="large">{{ heading }}</Heading>
                        <div class="text-tertiary">{{ $t('step.industry.subtext') }}</div>
                    </div>
                    <FormKit type="form" v-model="form" :actions="false" @submit="handleSubmit">
                        <FormKitSchema :schema="schema" :data="form" />
                    </FormKit>
                </div>
            </div>
            <div class="col-span-1 flex w-full justify-center">
                <div class="max-w-md pt-20">
                    <StepRightCol />
                </div>
            </div>
        </div>
    </client-only>
</template>

<script setup lang="ts">
import { UserStepKey } from '@/types/user'

const props = defineProps({
    stepKey: {
        type: String as PropType<UserStepKey>,
        required: true
    }
})

const { schema, form, handleSubmit } = await useStepForm(props.stepKey)
const { heading } = useSteps(props.stepKey)
</script>
