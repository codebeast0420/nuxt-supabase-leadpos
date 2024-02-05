<template>
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-60 lg:flex-col bg-gray-light">
        <div class="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4 border-r">
            <div class="flex shrink-0 items-center pt-5">
                <Logo class="w-[118px]" />
            </div>
            <CurrentLocationDisplay />
            <nav class="flex flex-1 flex-col">
                <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                        <ul role="list" class="sidebar-menu -mx-2 space-y-1">
                            <li v-for="item in menu" :key="item.id">
                                <NuxtLink :href="item.route"
                                    class="group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold !no-underline rounded-lg"
                                >
                                    <component :is="item.icon" class="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
                                    {{ $t(item.name) }}
                                </NuxtLink>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script setup lang="ts">
const menu = useSidebarMenu()
</script>

<style lang="scss">
.sidebar-menu {
    a.router-link-active {
        @apply text-primary shadow-custom bg-white;

        >svg {
            @apply fill-primary;
        }
    }

    a:not(.router-link-active) {
        @apply text-secondary hover:text-secondary hover:shadow-custom;

        >svg {
            @apply text-secondary hover:text-secondary;
        }
    }
}
</style>
