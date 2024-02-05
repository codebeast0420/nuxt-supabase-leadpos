export type TargetGroupContext = 'campaign' | 'location'

export interface TargetAudienceOptions {
    isPrefillForm: boolean,
    campaignId?: number,
    targetAudienceId?: number,
    locationId?: number
}

export interface TargetAreaOptions {
    isPrefillForm: boolean,
    campaignId?: number,
    targetAreaId?: number,
    locationId?: number
}

export interface BudgetOptions {
    isPrefillForm: boolean,
    campaignId: number,
}

export type BudgetOptionValue = 'daily_budget' | 'lifetime_budget'
export interface BudgetOption {
    value: BudgetOptionValue,
    label: string
}
