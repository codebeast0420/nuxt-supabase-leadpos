<template>
    <FormKit id="targetAudienceForm" type="form" v-model="form" @submit="handleSubmit" :actions="false">
        <FormKitSchema :schema="schema" :data="form" />
        <slot></slot>
    </FormKit>
</template>

<script setup lang="ts">
import { TargetGroupContext, TargetAudienceOptions } from '@/types/campaign'

const props = defineProps({
    context: {
        type: String as PropType<TargetGroupContext>,
        required: true
    },
    options: {
        type: Object as PropType<TargetAudienceOptions>,
        required: true
    },
})

const { schema, form, handleSubmit } = useTargetAudience(
    props.context,
    props.options
)

defineExpose({ handleSubmit })
</script>
