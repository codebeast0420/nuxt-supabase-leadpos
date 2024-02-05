import { Tables, Database } from '~/types/supabase.types'

const getCompanyId = async () => {
    const supabase = useSupabaseClient<Database>()
    const user = useSupabaseUser()

    const { data, error } = await supabase.from('profile')
        .select('company_id')
        .eq('id', user.value?.id)
        .single()

    if (error) throw error

    return data?.company_id
}

export const useCompany = () => {
    const supabase = useSupabaseClient<Database>()
    const user = useSupabaseUser()
    const companyId = useUserStore().company?.company_id

    const createCompany = async (company): Promise<Tables<'company'>> => {
        const { error } = await supabase.from('company').insert(company)

        if (error) throw error

        return error
    }

    const updateCompany = async (company: Partial<Tables<'company'>>, company_id: number | null = companyId ?? null): Promise<Tables<'company'>> => {
        if (!company_id) throw Error('No company_id was provided')

        const { data, error } = await supabase
            .from('company')
            .update(company)
            .eq('company_id', company_id)
            .select()
            .single()

        await refreshCompany()

        return data as Tables<'company'>
    }

    const companyHasLocation = async (company_id?) => {
        if (!company_id) {
            company_id = await getCompanyId()
        }

        const { data, error } = await supabase.from('location').select('company_id, address_id, target_audience_id, target_area_id').eq('company_id', company_id)

        if (error) throw error

        // check if data is complete
        return !!data[0]?.company_id || !!data[0]?.address_id || !!data[0]?.target_audience_id || !!data[0]?.target_area_id
    }

    const getCompany = async () => {
        const { data } = await supabase
            .from('company')
            .select()
            .single()

        return data
    }

    const getLocation = async (): Promise<Tables<'location'>> => {
        const { data } = await supabase
            .from('location')
            .select()
            .single()

        return data as Tables<'location'>
    }

    const getIndustry = async (): Promise<Tables<'industry'>> => {
        const userStore = useUserStore()

        const industryId = userStore.company?.industry_id

        if (!industryId) throw new Error('No industry_id found')

        const { data } = await supabase
            .from('industry')
            .select('*')
            .eq('industry_id', industryId)
            .single()

        return data as Tables<'industry'>
    }

    const { data: company, refresh: refreshCompany } = useAsyncData('company', getCompany)

    return {
        company,
        createCompany,
        companyHasLocation,
        getCompanyId,
        updateCompany,
        getCompany,
        getLocation,
        getIndustry
    }
}
