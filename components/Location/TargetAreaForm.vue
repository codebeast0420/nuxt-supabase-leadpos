<template>
    <FormKit id="targetAreaForm" type="form" @submit="handleSubmit" :actions="false" v-model="form">
        <FormKitSchema :schema="schema" :data="form" />
    </FormKit>
</template>

<script setup lang="ts">
import { TargetGroupContext, TargetAreaOptions } from '@/types/campaign'

const props = defineProps({
    context: {
        type: String as PropType<TargetGroupContext>,
        required: true
    },
    options: {
        type: Object as PropType<TargetAreaOptions>,
        required: true
    },
})

const { schema, form, handleSubmit } = useTargetArea(
    props.context,
    props.options
)

defineExpose({ handleSubmit })
</script>
