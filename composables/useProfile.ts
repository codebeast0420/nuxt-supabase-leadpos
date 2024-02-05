import { Tables, Database } from '~/types/supabase.types'

export const useProfile = () => {
    const supabase = useSupabaseClient()
    const first_name = ref('')
    const last_name = ref('')
    const full_name = ref('')

    const getProfile = async (): Promise<Tables<'profile'>> => {
        const { data } = await supabase
            .from('profile')
            .select()
            .single()

        return data as unknown as Tables<'profile'>
    }


    useAsyncData('getProfileName', async () => {
        const { data, error } = await supabase.from('profile').select('first_name, last_name').single()

        if (error) return Error(error.message)

        first_name.value = data.first_name
        last_name.value = data.last_name
        full_name.value = `${data.first_name} ${data.last_name}`
    })


    return { getProfile, full_name, first_name, last_name }
}
