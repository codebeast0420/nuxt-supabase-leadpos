<template>
    <div class="text-center flex items-center justify-center flex-col mt-20">
        <SvgoEmptyState class="w-32 h-32 inline-block" />
        <h3 class="mt-2 text-sm font-semibold text-gray-900">
            <i18n-t keypath="empty_state.title" tag="strong" class="block text-center">
                <template #thing>
                    {{ $t(`empty_state.type.${thing}`) }}
                </template>
            </i18n-t>
        </h3>
        <p class="mt-1 text-sm text-gray-500">
            {{ $t(`empty_state.description.${thing}`) }}
        </p>
        <div v-if="createNewRoute" class="mt-6">
            <NuxtLink class="btn btn-primary" :to="createNewRoute">
                <PlusIcon class="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                {{ $t(`create_new.${thing}`) }}
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/20/solid'

defineProps({
    thing: {
        type: String as PropType<'campaigns' | 'campaignTemplates'>,
        reqired: true
    },
    createNewRoute: {
        type: String,
        required: true
    }

})
</script>
