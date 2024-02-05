<template>
    <div class="flex space-x-4 items-center text-sm">
        <div class="w-2/6">
            <strong>{{ title }}</strong><br>
            <span v-if="description" class="text-xs">{{ description }}</span>
        </div>
        <div class="w-auto text-right flex-grow text-xs" v-html="additionalInfo"></div>
        <div class="w-[160px] text-right">
            <Button variant="light" @click="$emit('click')" full>{{ ctaLabel }}</Button>
        </div>
    </div>
</template>

<script setup lang="ts">
defineEmits(['click'])

defineProps({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    additionalInfo: {
        type: String,
    },
    ctaLabel: {
        type: String,
        default: 'Bearbeiten'
    }
})
</script>
