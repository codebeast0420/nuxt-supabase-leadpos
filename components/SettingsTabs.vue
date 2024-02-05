<template>
    <Tabs :tabs="tabs" />
</template>

<script setup lang="ts">
import {
    PROFILE_GENERAL_SETTINGS,
    PROFILE_CHANGE_PASSWORD_SETTINGS,
    COMPANY_GENERAL_SETTINGS,
    COMPANY_BILLING_SETTINGS,
    COMPANY_SUBSCRIPTION_SETTINGS
} from '@/constants/routes';
import { ProfileSettingsTabsContext } from '@/types/settings'
const user = useSupabaseUser()

const { context } = defineProps({
    context: {
        type: String as PropType<ProfileSettingsTabsContext>,
        required: true
    },
})

type Tab = {
    title: string;
    description: string;
    route: string;
}

const tabs = computed((): Tab[] => {
    let tabs: Tab[] = [];

    if (context === 'profile') {
        tabs.push(
            {
                title: 'profile.general.title',
                description: 'profile.general.description',
                route: PROFILE_GENERAL_SETTINGS
            },
        )

        // Don't show the tab for changing the password if the user is logged in with a provider other than email
        if (user.value?.app_metadata.provider === 'email') {
            tabs.push({
                title: 'profile.change_password.title',
                description: 'profile.change_password.description',
                route: PROFILE_CHANGE_PASSWORD_SETTINGS
            })
        }
    } else if (context === 'company') {
        tabs.push(
            {
                title: 'profile.company.general.title',
                description: 'profile.company.general.description',
                route: COMPANY_GENERAL_SETTINGS
            },
            {
                title: 'profile.company.billing.title',
                description: 'profile.company.billing.description',
                route: COMPANY_BILLING_SETTINGS
            },
            {
                title: 'profile.company.subscription.title',
                description: 'profile.company.subscription.description',
                route: COMPANY_SUBSCRIPTION_SETTINGS
            },
        )
    }

    return tabs
})

</script>
