<template>
<div class="text-center">
    <Button @click="handleSignInWithProvider('google')" variant="light" class="text-small">
        <template #icon>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.36023 11.7383L4.7801 13.904L2.65973 13.9489C2.02606 12.7735 1.66663 11.4288 1.66663 9.9998C1.66663 8.61795 2.00269 7.31485 2.59838 6.16744L4.48655 6.51353L5.31348 8.38993C5.14041 8.89451 5.04607 9.43617 5.04607 9.9998C5.04614 10.6115 5.15694 11.1976 5.36023 11.7383Z" fill="#FBBB00"/>
                <path d="M18.1877 8.44286C18.2834 8.94695 18.3333 9.46755 18.3333 9.9996C18.3333 10.5962 18.2706 11.1782 18.1511 11.7395C17.7454 13.6497 16.6854 15.3177 15.2171 16.4981L12.839 16.3763L12.5024 14.2756C13.4768 13.7042 14.2382 12.81 14.6393 11.7395H10.1834V8.44286H18.1877Z" fill="#518EF8"/>
                <path d="M15.2159 16.4982L15.2171 16.4981C13.789 17.646 11.9742 18.3334 9.99948 18.3334C6.82601 18.3334 4.06722 16.5592 2.65973 13.9489L5.36023 11.7383C6.06395 13.6165 7.87544 14.9539 9.99948 14.9539C10.9124 14.9539 11.7678 14.7071 12.5017 14.2762L15.2159 16.4982Z" fill="#28B446"/>
                <path d="M15.3184 3.58514L12.6188 5.79526C11.8592 5.32046 10.9613 5.04619 9.99935 5.04619C7.82723 5.04619 5.98196 6.44442 5.31348 8.38993L2.59838 6.16744C3.98526 3.4935 6.77872 1.66669 9.99935 1.66669C12.0213 1.66669 13.8752 2.38692 15.3184 3.58514Z" fill="#F14336"/>
            </svg>
        </template>
        <span v-if="context === 'signup'">{{ $t('general.signupWithGoogle') }}</span>
        <span v-else-if="context ==='login'">{{ $t('general.signinWithGoogle') }}</span>
    </Button>
</div>
</template>

<script lang="ts" setup>
import { AuthContext } from '@/types/auth'
const supabase = useSupabaseClient()

defineProps({
    context: {
        type: String as PropType<AuthContext>,
        default: 'login'
    }
})

const handleSignInWithProvider = (provider: 'google') => {
    supabase.auth.signInWithOAuth({ provider, options: { redirectTo: 'http://localhost:3000/provider?refresh=true' } })
}
</script>
