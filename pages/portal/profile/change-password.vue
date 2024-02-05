<template>
    <ProfileSettings context="change-password" />
</template>

<script setup lang="ts">
definePageMeta({
    layout: false,
    // only users who are registered via email can reset their password
    middleware: ['email-provider-only']
});
</script>
