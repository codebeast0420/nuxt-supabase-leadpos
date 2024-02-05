<template>
    <NuxtLink :to="data.route">{{ data.value }}</NuxtLink>
</template>

<script lang="ts" setup>
defineProps({
    data: {
        type: Object,
        required: true
    }
})
</script>
