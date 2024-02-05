<template>
    <component :is="tag" class="font-semibold" :class="sizeClasses">
        <slot></slot>
    </component>
</template>

<script setup lang="ts">
const props = defineProps({
    tag: {
        default: 'div',
        type: String as PropType<'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>,
    },
    size: {
        type: String as PropType<'large' | 'medium' | 'small'>,
        default: 'medium'
    }
})

const sizeClasses = computed(() => {
    const sizeMappings: Record<string, string> = {
        large: 'text-3xl',
        medium: 'text-xl',
        small: 'text-base',
    };

    return sizeMappings[props.size];
});
</script>
