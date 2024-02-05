<template>
    <div>
        <NuxtLayout name="default">
            <template #tabs>
                <SettingsTabs :context="tabContext" />
            </template>
            <Card :title="$t(`profile.settings.${context}.title`)" :description="$t(`profile.settings.${context}.description`)">
                <component :is="getComponentName(context)" />
            </Card>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
import { SettingsContext, ProfileSettingsContext, CompanySettingsContext, ProfileSettingsTabsContext } from '@/types/settings'
import {
    SettingsProfileChangePasswordForm,
    SettingsProfileGeneralForm,
    SettingsCompanyGeneralForm,
    SettingsCompanyBillingForm,
    SettingsCompanySubscriptionForm
} from '#components'

const { context } = defineProps({
    context: {
        type: String as PropType<SettingsContext>,
        required: true
    },
})

const tabContext = computed((): ProfileSettingsTabsContext => {
    const profileContexts: ProfileSettingsContext[] = ['profile-general', 'change-password'];
    const companyContexts: CompanySettingsContext[] = ['company-general', 'billing', 'subscription'];
    let value: ProfileSettingsTabsContext = 'profile';

    if (profileContexts.includes(context as ProfileSettingsContext)) {
        value = 'profile'
    }

    if (companyContexts.includes(context as CompanySettingsContext)) {
        value = 'company'
    }

    return value;
});

const getComponentName = (context: SettingsContext) => {
    switch (context) {
        case 'change-password':
            return SettingsProfileChangePasswordForm;
        case 'profile-general':
            return SettingsProfileGeneralForm;
        case 'company-general':
            return SettingsCompanyGeneralForm;
        case 'billing':
            return SettingsCompanyBillingForm;
        case 'subscription':
            return SettingsCompanySubscriptionForm;
        default:
            throw new Error('Invalid context');
    }
}
</script>
