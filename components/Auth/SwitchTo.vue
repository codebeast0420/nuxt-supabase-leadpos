<template>
    <i18n-t :keypath="keypath" tag="small" class="block text-center">
        <template #login>
            <NuxtLink :to="route">{{ $t(loginOrRegisterLinkText) }}</NuxtLink>
        </template>
    </i18n-t>
</template>

<script setup lang="ts">
import { AuthContext } from '~/types/auth'
const { t } = useI18n()
const props = defineProps({
    context: {
        type: String as PropType<AuthContext>,
    }
})

const keypath = computed(() => {
    return `form.${props.context}.already_have_an_account`
})

const route = computed(() => {
    return props.context === 'login' ? '/signup' : '/login'
})

const loginOrRegisterLinkText = computed(() => {
    return props.context === 'signup' ? 'form.signup.login' : 'form.login.register'
})
</script>
