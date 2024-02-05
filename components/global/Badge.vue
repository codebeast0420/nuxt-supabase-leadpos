<template>
    <span :class="badgeClass" class="leading-none">
        <slot></slot>
        <button v-if="isClosable" type="button" @click="handleClick" :class="buttonClass">
            <span class="sr-only">Remove</span>
            <svg viewBox="0 0 14 14" :class="svgClass">
                <path d="M4 4l6 6m0-6l-6 6" />
            </svg>
            <span class="absolute -inset-1" />
        </button>
    </span>
</template>

<script setup lang="ts">
const { variant, isClosable } = defineProps({
    variant: {
        type: String,
        default: 'default',
    },
    isClosable: {
        default: false,
    },
});

const badgeClass = computed(() => {
    return variant === 'info'
        ? 'inline-flex items-center gap-x-0.5 rounded-md bg-aqua-light px-4 text-xs font-medium text-gray-600 cursor-default'
        : 'inline-flex items-center gap-x-0.5 rounded-md bg-gray-300 px-2 py-1 text-xs font-medium text-gray-800 cursor-default';
});

const buttonClass = computed(() => {
    return variant === 'info'
        ? 'group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-aqua-light'
        : 'group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-gray-400';
});

const svgClass = computed(() => {
    return variant === 'info'
        ? 'h-3.5 w-3.5 stroke-aqua group-hover:stroke-aqua'
        : 'h-3.5 w-3.5 stroke-gray-800 group-hover:stroke-gray-800';
});

const emit = defineEmits(['remove']);

const handleClick = () => {
    emit('remove');
};
</script>
