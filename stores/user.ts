import { Tables, Database } from '~/types/supabase.types'

export const useUserStore = defineStore({
    id: 'UserStore',
    state: () => ({
        profile: null as Tables<'profile'> | null,
        location: null as Tables<'location'> | null,
        company: null as Tables<'company'> | null,
    }),
    actions: {
        async fetchInitialData() {
            
            const [profileData, locationData, companyData] = await Promise.all([
                useProfile().getProfile(),
                useCompany().getLocation(),
                useCompany().getCompany(),
            ])

            this.profile = profileData;
            this.location = locationData;
            this.company = companyData;
        },
    }
})


