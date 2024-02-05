import { ISortBy, IFilterBy } from '@/types/campaignTemplates'
import { Tables, Database } from '~/types/supabase.types'

export const useIndustries = () => {
    const supabase = useSupabaseClient()

    const getIndustries = async (sortBy: ISortBy = { industryId: null }, filterBy: IFilterBy = { languageCode: null, industryIds: null }): Promise<Tables<'industry'>> => {
        let query = supabase
            .from('industry')
            .select('industry_id, name, emoji')
            .eq('is_public', true)

        if (filterBy.industryIds && filterBy.industryIds.length > 0) {
            query = query.in('industry_id', filterBy.industryIds)
        }

        const { data, error } = await query

        if (error) throw error

        if (!data) throw new Error('No data returned from Database')

        if (sortBy.industryId !== null) {
            const sortedData = data.sort((a, b) => {
                if (a.industry_id === sortBy.industryId) return -1
                if (b.industry_id === sortBy.industryId) return 1
                return 0
            })

            return sortedData
        }

        return data
    }

    return { getIndustries }
}
