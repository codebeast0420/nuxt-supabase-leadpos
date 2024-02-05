<template>
    <div>
        <client-only>
            <TransitionRoot as="template" :show="sidebarOpen">
                <Dialog as="div" class="relative z-50 lg:hidden" @close="sidebarOpen = false">
                    <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
                        enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
                        leave-to="opacity-0">
                        <div class="fixed inset-0 bg-gray-900/80" />
                    </TransitionChild>
                    <div class="fixed inset-0 flex">
                        <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                            enter-from="-translate-x-full" enter-to="translate-x-0"
                            leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
                            leave-to="-translate-x-full">
                            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
                                <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
                                    enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100"
                                    leave-to="opacity-0">
                                    <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                                        <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                                            <span class="sr-only">Close sidebar</span>
                                            X
                                        </button>
                                    </div>
                                </TransitionChild>
                                <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4">
                                    <div class="flex h-16 shrink-0 items-center">
                                        <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=white"
                                            alt="Your Company" />
                                    </div>
                                    <nav class="flex flex-1 flex-col">
                                        <ul role="list" class="flex flex-1 flex-col gap-y-7">
                                            <li>
                                                <ul role="list" class="sidebar-menu -mx-2 space-y-1">
                                                    <li v-for="item in menu" :key="item.name">
                                                        <NuxtLink :href="item.route"
                                                            class="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold">
                                                            <component :is="item.icon" aria-hidden="true"
                                                                :class="['h-6 w-6 shrink-0']" />
                                                            {{ item.name }}
                                                        </NuxtLink>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </Dialog>
            </TransitionRoot>
            <Sidebar />


    <div class="lg:pl-60">
        <Header />
        <main class="pb-8">
            <Container v-if="!isFacebookAccountConnected || !isFacebookPagesConnected"
                class="my-12"
            >
                <FacebookConnectNotification />
            </Container>
            <div class="tabs-go-here">
                <slot name="tabs"></slot>
            </div>
            <Container class="mt-12">
                <slot />
            </Container>
        </main>
    </div>
    <LocationModal v-if="!hasLocation" />
    </client-only>
</div>
</template>

<script setup lang="ts">
import { TransitionChild, DialogPanel, Dialog, TransitionRoot } from '@headlessui/vue'
const { companyHasLocation, company } = useCompany()
const hasLocation = ref<boolean>(true)

const isFacebookAccountConnected = computed(() => {
    return !!company.value?.facebook_account_id
})

const isFacebookPagesConnected = computed(() => {
    return !!company.value?.active_facebook_page_id
})

useAsyncData('companyHasLocation', async () => {
    hasLocation.value = await companyHasLocation()
})

useHead({
    htmlAttrs: {
        class: 'h-full'
    },
    bodyAttrs: {
        class: 'h-full bg-gray-light'
    }
})

const app = useNuxtApp()
const menu = useSidebarMenu()
const sidebarOpen = useState('sidebarOpen', () => false)

app.hook('page:start', () => {
    if (sidebarOpen.value) sidebarOpen.value = false
})
</script>


