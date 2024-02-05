<template>
    <Menu as="div" class="relative">
        <MenuButton @click="isOpen = !isOpen" class="-m-1.5 flex items-center p-1.5">
            <span class="sr-only">Open user menu</span>
            <UserAvatar :show-name="true" :show-chevron="true" />
        </MenuButton>
        <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <MenuItems :open="isOpen" class="absolute right-0 z-10 mt-2.5 w-[280px] origin-top-right rounded-md bg-white py- shadow-lg ring-1 ring-gray-900/5 focus:outline-none divide-y divide-gray-100">
                <div class="text-center py-4">
                    <div class="mb-3">
                        <UserAvatar size="lg" />
                    </div>
                    <div>
                        <span class="text-medium fw-600">{{ user?.user_metadata.name || user.user_metadata.first_name + user.user_metadata.last_name }}</span><br>
                        <span class="text-small text-muted">{{ user?.email }}</span>
                    </div>
                </div>
                <div>
                    <HeaderUserNavigation />
                </div>
            </MenuItems>
        </transition>
    </Menu>
</template>

<script setup lang="ts">
const app = useNuxtApp()
import {
    Menu,
    MenuButton,
    MenuItems,
} from '@headlessui/vue'
const user = useSupabaseUser()
const isOpen = ref(false)

app.hook('page:start', () => {
    if (isOpen.value === true) {
        isOpen.value = false
    }
})
</script>
