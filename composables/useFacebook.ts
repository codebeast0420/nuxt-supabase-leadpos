import { Tables, Database } from '@/types/supabase.types'
import { FacebookPage } from '@/types/facebook'

export const useFacebook = () => {
    const { company } = useCompany()

    const getFacebookPages = async (): Promise<FacebookPage[]> => {
            try {
                const pages = await $fetch<FacebookPage[]>(`/api/facebook/${company.value?.facebook_account_id}/pages`, {
                    method: 'get',
                })

                return pages
            } catch (error) {
                throw createError('No pages returned from server')
            }
    }

    const { data: facebookPages } = useAsyncData('facebookPages', getFacebookPages)

    return { facebookPages }
}
