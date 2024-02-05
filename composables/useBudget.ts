import { BudgetOption, BudgetOptions } from "~/types/campaign"
import { Database, DbResultErr, DbResultOk, Tables } from "~/types/supabase.types"
import cloneDeep from 'lodash/cloneDeep';
import { getNode } from '@formkit/core'

export const useBudget = (
    options: BudgetOptions
) => {
    const { isPrefillForm, campaignId } = options
    const { isObjectEmpty } = useUtils()
    const supabase = useSupabaseClient<Database>()
    const { t } = useI18n()
    const { getCampaignById, updateCampaignById } = useCampaign()
    let budgetPrefilled = {}

    if (!campaignId) throw Error('campaignId is required to use useBudget composable')

    const budgetOptions: BudgetOption[] = [
        {
            value: 'daily_budget',
            label: t('budget.type.daily_budget')
        },
        {
            value: 'lifetime_budget',
            label: t('budget.type.lifetime_budget')
        }
    ]

    const getBudgetById = async (budgetId: number): Promise<Tables<'budget'>> => {
        const { data } = await supabase
            .from('budget')
            .select()
            .eq('budget_id', budgetId)
            .single()

        return data as Tables<'budget'>
    }

    const getBudgetByCampaignId = async (campaignId: number): Promise<Tables<'budget'>> => {
        const campaign = await getCampaignById(campaignId)

        const budget = await getBudgetById(campaign.budget_id)

        return budget as Tables<'budget'>
    }

    const updateBudget = async (budget: Tables<'budget'>): Promise<Tables<'budget'>> => {
        const { data } = await supabase
            .from('budget')
            .update(budget)
            .eq('budget_id', budget.budget_id)
            .select()
            .single()

        return data as DbResultOk<Tables<'budget'>>
    }

    const getInitialState = async (): Promise<Tables<'budget'> | {}> => {
        if (!campaignId) throw Error('campaignId is required')

        const budget = await getBudgetByCampaignId(campaignId)

        if (!budget) {}

        if (!budget) throw Error('budget is required')

        return cloneDeep(budget)
    }

    // const handleSubmit = async (values: Tables<'budget'>) => {
    //     try {
    //         // TODO: values is undefined :)
    //         console.log('values', values)
    //         const { budget_id } = await updateBudget(values)
    //         await updateCampaignById(campaignId, {
    //             budget_id
    //         })
    //         return budget_id
    //     } catch (error) {
    //         throw createError('Error updating budget')
    //     }
    // }


    return {
        budgetOptions,
        getBudgetById,
        getBudgetByCampaignId,
        getInitialState,
        updateBudget,
    }
}
