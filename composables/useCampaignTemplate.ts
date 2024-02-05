import { ISortBy, IFilterBy } from '@/types/campaignTemplates'

export const useCampaignTemplate = () => {
    const supabase = useSupabaseClient()

    const getDefaultTemplates = async (filterBy: IFilterBy = { languageCode: null, industryIds: null }) => {
        let query = supabase
            .from('campaign_template_default')
            .select('...campaign_template!inner(*, language_code)')

        if (filterBy.languageCode) {
            query = query.eq('campaign_template.language_code', filterBy.languageCode)
        }

        if (filterBy.industryIds) {
            query = query.overlaps('campaign_template.industry_ids', [filterBy.industryIds])
        }

        const { data, error } = await query

        if (error) throw error

        if (!data) throw new Error('No data returned from Database')

        return data
    }

    const createTemplate = async (template: any) => {
        delete template.campaign_template_id;

        const { data, error } = await supabase
            .from('campaign_template')
            .insert(template)
            .select('*')
            .single()

        if (error) throw error

        if (!data) throw new Error('No data returned from Database')

        return data
    }

    const updateTemplate = async (template: any) => {
        const { data, error } = await supabase
            .from('campaign_template')
            .update(template)
            .eq('campaign_template_id', template.campaign_template_id)
            .select()

        if (error) throw error

        if (!data) throw new Error('No data returned from Database')

        return data
    }

    const createOrUpdateTemplate = async (template: any) => {
        const { data, error } = await supabase
            .from('campaign_template')
            .upsert(template)
            // TODO: https://linear.app/newwwagency/issue/LEA-136 this wont be possible with RLS enabled
            .select('*')
            .single()

        if (error) throw error

        if (!data) throw new Error('No data returned from Database')

        return data
    }

    return { getDefaultTemplates, createOrUpdateTemplate, createTemplate, updateTemplate }
}
