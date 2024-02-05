<template>
    <i18n-t keypath="form.signup.policy" tag="small" class="block text-center text-xs text-tertiary">
        <template #app_name>
            {{ config.public.APP_NAME }}
        </template>
        <template #terms_of_service>
            <NuxtLink :to="$t('policies.terms_of_service.route')">{{ $t('policies.terms_of_service.text') }}</NuxtLink>
        </template>
        <template #privacy_policy>
            <NuxtLink :to="$t('policies.privacy_policy.route')">{{ $t('policies.privacy_policy.text') }}</NuxtLink>
        </template>
    </i18n-t>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
</script>
