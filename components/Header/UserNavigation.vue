<template>
    <div class="divide-y divide-gray-100">
        <div>
            <MenuItem v-slot="{ active }">
                <NuxtLink :to="PROFILE_SETTINGS_ROOT" class="hover:no-underline" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'group flex items-center px-4 py-3 text-sm']">
                    <UserIcon class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                    {{ $t('user_navigation.personal_preferences') }}
                </NuxtLink>
            </MenuItem>
            <MenuItem v-slot="{ active }">
                <NuxtLink :to="COMPANY_SETTINGS_ROOT" class="hover:no-underline" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'group flex items-center px-4 py-3 text-sm']">
                    <BuildingStorefrontIcon class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                    {{ $t('user_navigation.company_settings') }}
                </NuxtLink>
            </MenuItem>
        </div>
        <div>
            <MenuItem v-slot="{ active }">
                <button @click="logout" class="block w-full" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'group flex items-center px-4 py-3 text-sm']">
                    <ArrowLeftOnRectangleIcon class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                    {{ $t('user_navigation.logout') }}
                </button>
            </MenuItem>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    MenuItem,
} from '@headlessui/vue'
import { UserIcon, BuildingStorefrontIcon, ArrowLeftOnRectangleIcon } from '@heroicons/vue/20/solid'
import { PROFILE_SETTINGS_ROOT, COMPANY_SETTINGS_ROOT, LOGIN } from '~/constants/routes'
const supabase = useSupabaseClient()

const logout = async () => {
    await supabase.auth.signOut()
    return navigateTo(LOGIN)
}
</script>
