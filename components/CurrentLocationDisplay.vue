<template>
    <div v-if="location && location.location_name" class="p-2 border rounded-lg shadow-md bg-white">
        <div class="flex">
            <div>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-2">
                    <path d="M0 4C0 1.79086 1.79086 0 4 0H28C30.2091 0 32 1.79086 32 4V28C32 30.2091 30.2091 32 28 32H4C1.79086 32 0 30.2091 0 28V4Z" fill="#F4F5F6"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16 26C21.5229 26 26 21.5228 26 16C26 10.4772 21.5229 6 16 6C10.4771 6 6 10.4772 6 16C6 21.5228 10.4771 26 16 26ZM19.1197 10.6584C19.2715 10.119 18.7481 9.80007 18.27 10.1407L11.5966 14.8948C11.0781 15.2641 11.1597 16 11.7191 16H13.4764V15.9864H16.9013L14.1106 16.971L12.8804 21.3416C12.7285 21.881 13.2519 22.1999 13.73 21.8593L20.4035 17.1052C20.9219 16.7359 20.8403 16 20.281 16H17.6161L19.1197 10.6584Z" fill="#E74C3C"/>
                </svg>
            </div>
            <div class="truncate leading-4" :title="location?.location_name">
                <span class="text-gray-500 text-xs">{{ $t('location') }}</span><br>
                <p class="text-sm truncate">{{ location?.location_name }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { location } = useUserStore();
</script>
