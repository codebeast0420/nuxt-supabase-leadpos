<template>
    <div class="flex items-center">
        <span class="inline-block w-1.5 h-1.5 mr-1 rounded-full" :class="statusColor"></span>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    type: {
        type: String,
        required: true
    }
})

const statusColor = computed(() => {
    switch (props.type) {
        case "SUCCESS":
            return "bg-green-500";
            break;

        case "HALF_SUCCESS":
            return "border-2 border-green-500 bg-white";
            break;

        case "DISABLED":
            return "bg-gray-500";
            break;

        default:
            break;
    }
})
</script>
