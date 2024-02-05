export type ProfileSettingsContext = 'profile-general' | 'change-password'
export type CompanySettingsContext = 'company-general' | 'billing' | 'subscription'
export type ProfileSettingsTabsContext = 'profile' | 'company'

export type SettingsContext = ProfileSettingsContext | CompanySettingsContext;
