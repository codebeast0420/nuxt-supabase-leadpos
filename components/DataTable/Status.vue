<template>
    <StatusBadge :type="data.status_type">{{ data.value }}</StatusBadge>
</template>

<script lang="ts" setup>
defineProps({
    data: {
        type: Object,
        required: true
    }
})
</script>
