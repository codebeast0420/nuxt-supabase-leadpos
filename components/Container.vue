<template>
    <div class="px-4 sm:px-6 lg:px-8 mx-auto" :class="maxWidthClass">
        <slot />
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    size: {
        type: String as PropType<'sm' | 'xl'>,
        default: 'xl'
    }
})

const maxWidthClass = computed(() => {
    switch (props.size) {
        case 'sm':
            return 'w-full sm:max-w-md'
        case 'xl':
            return ''
        default:
            return ''
    }
});
</script>
