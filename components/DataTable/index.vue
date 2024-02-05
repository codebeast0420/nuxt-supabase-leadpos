<template>
    <DataTableCrudHeader
        :title="title"
        :hasCreateNewAction="hasCreateNewAction"
        :createNewActionTitle="createNewActionTitle"
        :createNewActionRoute="createNewActionRoute"
    />
    <div class="mt-8 flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table class="min-w-full divide-y divide-gray-300">
                    <thead>
                        <tr>
                            <th v-for="col in thead" scope="col"
                                class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                <button @click="$emit('setOrderBy', col)" class="group inline-flex">
                                    {{ $t(col) }}
                                    <span
                                        class="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                                        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd"
                                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </span>
                                </button>
                            </th>
                            <th scope="col" class="relative py-3.5 pl-3 pr-0">
                                <span class="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white">
                        <tr v-for="row in data">
                            <td v-for="rowData in row"
                                class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                <component
                                    :is="getTypeComponent(rowData.type)"
                                    :data="rowData"
                                />
                                </td>
                            <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm sm:pr-0">
                                <NuxtLink :to="`${String(route.name)}/${row.id}`"
                                    class="text-indigo-600 hover:text-indigo-900">Edit</NuxtLink>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { DataTableStatus, DataTableText, DataTableLink } from '#components'
import type { Database } from '~/types'
const route = useRoute()
const emit = defineEmits(['searchInput', 'setOrderBy'])

const Status = resolveComponent('DataTableStatus')
const Text = resolveComponent('DataTableText')
const Link = resolveComponent('DataTableLink')

const props = defineProps({
    thead: {
        type: Array as PropType<string[]>,
        required: true
    },
    data: {
        type: Array as PropType<Database['public']['tables']>,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    hasCreateNewAction: {
        type: Boolean,
        default: false
    },
    createNewActionTitle: {
        type: String,
        default: 'Create'
    },
    createNewActionRoute: {
        type: String,
        default: ''
    }
})

const getTypeComponent = (type) => {
    switch (type) {
        case 'Text':
            return Text
            break;

        case 'Status':
            return Status
            break;

        case 'Link':
            return Link
            break;

        default:
            break;
    }
}

const searchInput = ref('')
</script>
