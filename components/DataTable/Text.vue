<template>
    <div>{{ data.value }}</div>
</template>

<script lang="ts" setup>
defineProps({
    data: {
        type: Object,
        required: true
    }
})
</script>
