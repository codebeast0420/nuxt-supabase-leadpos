<template>
    <span v-if="userMetadata.avatar_url" class="relative inline-block">
        <img class="rounded-full" :class="sizeClasses" :src="userMetadata.avatar_url" alt="" referrerpolicy="no-referrer" />
    </span>
    <span v-else class="inline-flex items-center justify-center rounded-full bg-primary" :class="sizeClasses">
        <span class="text-xl font-medium leading-none text-white">
            {{ generateInitials(userMetadata.name || userMetadata.first_name + userMetadata.last_name) }}
        </span>
    </span>
    <span v-if="showName || showChevron" class="hidden lg:flex lg:items-center">
        <span v-if="showName" class="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">{{ userMetadata.name || userMetadata.first_name + userMetadata.last_name }}</span>
        <ChevronDownIcon v-if="showChevron" class="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
    </span>
</template>

<script setup lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
const user = useSupabaseUser()

const { size } = defineProps({
    size: {
        type: String as PropType<'md' | 'lg'>,
        default: 'md',
    },
    showName: {
        type: Boolean,
        default: false
    },
    showChevron: {
        type: Boolean,
        default: false
    }
})

const sizeClasses = computed(() => {
    switch (size) {
        case 'md':
            return 'h-10 w-10'
        case 'lg':
            return 'h-[96px] w-[96px]'
    }
})

const userMetadata = user.value!.user_metadata

const generateInitials = (name: string | undefined): string => {
    if (!name) return ''

    const nameParts = name.split(' ')

    const initials = nameParts.map(part => part.charAt(0).toUpperCase())

    return initials.join('')
}
</script>
