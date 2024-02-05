<template>
    <div class="card divide-y divide-gray-200 overflow-hidden rounded-lg bg-white"
        :class="{ 'max-w-3xl': size === 'md', 'mx-auto': center }">
        <CardSectionTitle :title="title" :description="description" />
        <div class="px-4 py-5 sm:p-6">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    size: {
        type: String as PropType<'md' | 'auto'>,
        default: 'auto'
    },
    title: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    center: {
        type: Boolean,
        default: true
    }
})
</script>

<style>
.card {
    box-shadow: 0px 0px 0px 1px rgba(18, 55, 105, 0.08), 0px 1px 2px 0px rgba(164, 172, 185, 0.24);
}
</style>
