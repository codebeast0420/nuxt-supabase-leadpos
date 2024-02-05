<template>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Container size="sm" class="text-center">
            <SvgoEnvelope class="mb-12" />
            <h2 class="mb-4">
                {{ $t('email.confirm.heading') }}
            </h2>
            <p>
                {{ $t('email.confirm.text') }}
            </p>
        </Container>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: 'login-and-register'
})
</script>
