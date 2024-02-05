<template>
    <div>
        <div class="border-b border-gray-200 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
            <nav class="-mb-px flex" aria-label="Tabs">
                <NuxtLink v-for="tab in tabs" :key="tab.title" :to="tab.route" exact-active-class="!border-primary !text-primary" :class="['border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700', 'whitespace-nowrap border-b-2 py-4 px-4 text-sm font-medium', 'hover:no-underline']">
                    {{ $t(tab.title) }}
                </NuxtLink>
            </nav>
        </div>
    </div>
</template>

<script setup lang="ts">
type Tab = {
    title: string;
    description: string;
    route: string;
}

defineProps({
    tabs: {
        type: Array as PropType<Tab[]>,
        required: true
    }
})
</script>
