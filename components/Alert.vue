<template>
    <div :class="rootClasses">
        <div class="flex">
            <div class="flex-shrink-0">
                <XCircleIcon :class="iconClasses" aria-hidden="true" />
            </div>
            <div class="ml-3">
                <h3 :class="titleClasses">
                    {{ title }}
                </h3>
                <div :class="textClasses">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { XCircleIcon } from '@heroicons/vue/20/solid'
import { computed } from 'vue'
const { t } = useI18n()

const props = defineProps({
    variant: {
        type: String as PropType<'warning' | 'error'>,
        default: 'error',
    },
    title: {
        type: String,
    }
})

const title = computed(() => {
    return props.title || t(`alert.${props.variant}.title_default`)
})

const rootClasses = computed(() => {
    return props.variant === 'warning' ? 'rounded-md bg-yellow-50 p-4' : 'rounded-md bg-red-50 p-4'
})

const iconClasses = computed(() => {
    return props.variant === 'warning' ? 'h-5 w-5 text-yellow-400' : 'h-5 w-5 text-red-400'
})

const titleClasses = computed(() => {
    return props.variant === 'warning' ? 'text-sm font-medium text-yellow-800' : 'text-sm font-medium text-red-800'
})

const textClasses = computed(() => {
    return props.variant === 'warning' ? 'mt-2 text-sm text-yellow-700' : 'mt-2 text-sm text-red-700'
})
</script>
