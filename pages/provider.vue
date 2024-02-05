<template>
    <div>You are being redirected...</div>
</template>

<script setup lang="ts">
import * as ROUTES from '~/constants/routes'

    onMounted(() => {
        setTimeout(async () => {
            return navigateTo(ROUTES.START_PAGE_AFTER_LOGIN)
        }, 3000);
    })
</script>
