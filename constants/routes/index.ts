// User Routes
export const BASE_URL = '/'
export const LOGIN = '/login'

export const ADD_PAYMENT_METHOD = '/welcome/payment-method'
export const ADD_INDUSTRY = '/welcome/industry'
export const FIRST_STEP_ROUTE = ADD_PAYMENT_METHOD

export const PORTAL_ROOT_ROUTE = '/portal'
export const DASHBOARD = '/portal/dashboard'
export const CAMPAIGNS_OVERVIEW = '/portal/campaigns'
export const LEADS_OVERVIEW = '/portal/leads'
export const LEAD_FORMS_OVERVIEW = '/portal/lead-forms'

export const START_PAGE_AFTER_LOGIN = CAMPAIGNS_OVERVIEW

export const PROFILE_GENERAL_SETTINGS = '/portal/profile/general'
export const PROFILE_CHANGE_PASSWORD_SETTINGS = '/portal/profile/change-password'

export const COMPANY_GENERAL_SETTINGS = '/portal/company/general'
export const COMPANY_BILLING_SETTINGS = '/portal/company/billing'
export const COMPANY_SUBSCRIPTION_SETTINGS = '/portal/company/subscription'

export const PROFILE_SETTINGS_ROOT = PROFILE_GENERAL_SETTINGS
export const COMPANY_SETTINGS_ROOT = COMPANY_BILLING_SETTINGS

export const CREATE_NEW_CAMPAIGN = '/portal/campaigns/detail/create/template'
export const CREATE_NEW_CAMPAIGN_DETAIL_CREATE = '/portal/campaigns/detail/create/:campaignTemplateId'
export const CREATE_NEW_CAMPAIGN_DETAIL_EDIT = '/portal/campaigns/detail/edit/:campaignId/:campaignTemplateId'

// Admin Routes
export const ADMIN_ROOT_ROUTE = '/admin'
export const ADMIN_DASHBOARD = '/admin/dashboard'
export const ADMIN_START_PAGE_AFTER_LOGIN = ADMIN_DASHBOARD


