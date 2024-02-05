<template>
    <component :is="componentType" :to="to" class="btn" :class="classes">
        <span v-if="!isLoading" class="flex">
            <span v-if="!!$slots.icon" class="inline-block mr-2">
                <slot name="icon"></slot>
            </span>
            <slot></slot>
        </span>
        <span v-else>
            <LoadingSpinner />
        </span>
    </component>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
const NuxtLink = resolveComponent('NuxtLink')

const props = defineProps({
    to: String,
    variant: {
        type: String as PropType<'primary' | 'light' | 'danger' | 'custom'>,
        default: 'primary'
    },
    full: {
        type: Boolean,
        default: false
    },
    isLoading: {
        type: Boolean,
        default: false
    }
})

const componentType = computed(() => (props.to ? NuxtLink : 'button'))

const classes = computed(() => {
    return {
        'btn-light': props.variant === 'light',
        'btn-primary': props.variant === 'primary',
        'btn-danger': props.variant === 'danger',
        'btn-custom': props.variant === 'custom',
        'w-full': props.full
    }
})
</script>
