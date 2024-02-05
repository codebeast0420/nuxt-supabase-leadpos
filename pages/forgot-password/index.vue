<template>
    <section>
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div
                class="w-full sm:max-w-md xl:p-0">
                <div class="space-y-4 md:space-y-6">
                    <div class="text-center h-full -mx-3.5">
                        <Heading size="large" tag="h2">
                            {{ $t('general.forgotPasswordTitle') }}
                        </Heading>
                        <p class="text-medium text-secondary">
                            {{ $t('general.forgotPasswordSubtitle') }}
                        </p>
                    </div>
                    <AuthForm :context="context" />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { AuthContext } from 'types/auth';
definePageMeta({
    layout: 'login-and-register'
})

const context: AuthContext = 'forgot-password'
</script>
