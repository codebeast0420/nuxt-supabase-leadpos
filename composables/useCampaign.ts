import { Database, DbResult, DbResultErr, DbResultOk, Tables,  } from "~/types/supabase.types"

export const useCampaign = () => {

    const supabase = useSupabaseClient<Database>()

    const hasCampaigns = async (): boolean => {
        const { getCompanyId } = useCompany()
        const company_id = await getCompanyId()
        const { data, error } = await supabase.from('campaign').select('campaign_id').eq('company_id', company_id)

        return !!data?.campaign_id
    }



    const getCampaignById = async (id: number): Promise<Tables<'campaign'>> => {
        const { data: campaign, error } = await supabase.from('campaign').select().eq('campaign_id', id).single()

        return campaign as Tables<'campaign'>
    }

    const createOrUpdateCampaign = async (campaign: any) => {
        const { data, error } = await supabase.from('campaign')
            .upsert(campaign)
            .select('*')
            .single()

        if (error) throw error

        if (!data) throw new Error('No data returned from Database')

        return data
    }

    const updateCampaignById = async (campaign_id: number, campaign) => {

        const { data, error } = await supabase.from('campaign')
            .update(campaign)
            .eq('campaign_id', campaign_id)
            .single()

        if (error) throw error

        if (!data) throw new Error('No data returned from Database')

        return data
    }

    return { hasCampaigns, createOrUpdateCampaign, getCampaignById, updateCampaignById }
}
