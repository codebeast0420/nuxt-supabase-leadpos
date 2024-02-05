<template>
    <div v-if="title || description" class="px-4 py-5 sm:px-6">
        <strong v-if="title">{{ title }}</strong><br>
        <small v-if="description" class="text-muted">{{ description }}</small>
    </div>
</template>

<script setup lang="ts">
defineProps({
    title: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
})
</script>
