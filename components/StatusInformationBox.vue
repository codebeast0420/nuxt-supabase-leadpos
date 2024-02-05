<template>
    <div class="flex items-center justify-start gap-1 w-full my-4 rounded-md shadow-sm p-3 border-l-4" :class="boxClasses">
        <ExclamationCircleIcon class="w-4 h-4" :class="iconClasses" aria-hidden="true" />
        <span class="text-sm"><b>{{ type.toUpperCase() }}: </b>{{ message }}</span>
    </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { statusType } from '@/types/status.types';
import { ExclamationCircleIcon } from "@heroicons/vue/20/solid"

const props = defineProps({
    message: {
        type: String,
        required: true,
    },
    type: {
        type: String as PropType<keyof typeof statusType>,
        required: true,
    }
})

const iconClasses = computed(() => {
    switch(props.type) {
        case "error":
            return "text-red-600";
        case "warning":
            return "text-yellow-600";
        case "information":
            return "text-blue-600";
        case "success":
            return "text-green-600";
    }
})

const boxClasses = computed(() => {
    switch(props.type) {
        case "error":
            return "bg-red-200 border-red-400 text-red-600";
        case "warning":
            return "bg-yellow-200 border-yellow-400 text-yellow-600";
        case "information":
            return "bg-blue-200 border-blue-400 text-blue-600";
        case "success":
            return "bg-green-200 border-green-400 text-green-600";
    }
})

</script>