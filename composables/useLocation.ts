import { FormKitSchemaDefinition, getNode } from '@formkit/core'
import { Tables, Database } from '~/types/supabase.types'

export const useLocation = (prefillForm = false) => {
    const { t } = useI18n()
    const { DACHCountries, nonDachCountries, generateFormkitSchemaOptions } = useCountries()
    const { generateFormFromSchema, isObjectEmpty, removeEmptyObjectValues } = useUtils()
    const supabase = useSupabaseClient()
    const locationPrefilled = ref({})
    const addressPrefilled = ref({})
    const locationId = useUserStore().location?.location_id

    const schema: FormKitSchemaDefinition = [
        {
            $formkit: 'text',
            name: 'location_name',
            label: t('form.location.location_name'),
            validation: 'required',
        },
        {
            $formkit: 'text',
            name: 'brand_color',
            label: t('form.location.brand_color'),
            validation: 'required',
        },
        {
            $formkit: 'select',
            name: 'country',
            label: t('form.location.country'),
            options: [
                ...generateFormkitSchemaOptions(DACHCountries),
                {
                    $el: 'option',
                    attrs: {
                        disabled: true
                    },
                    value: '',
                    label: '-----------------------'
                },
                ...generateFormkitSchemaOptions(nonDachCountries),
            ],
            validation: 'required',
            value: 'DE'
        },
        {
            $formkit: 'text',
            name: 'city',
            label: t('form.location.city'),
            validation: 'required',
        },
        {
            $formkit: 'text',
            name: 'zip_code',
            label: t('form.location.zip_code'),
            validation: 'required',
        },
        {
            $formkit: 'text',
            name: 'line1',
            label: t('form.location.line1'),
            validation: 'required',
        },
        {
            $formkit: 'text',
            name: 'line2',
            label: t('form.location.line2'),
        },
        {
            $formkit: 'text',
            name: 'state',
            label: t('form.location.state'),
            validation: 'required',
        },
        {
            $formkit: 'text',
            name: 'neighborhood',
            label: t('form.location.neighborhood'),
            validation: 'required',
        },
    ]

    // const form = ref(generateFormFromSchema(schema))
    const form = {
        initialState: {
            country: 'DE'
        }
    }

    const createOrUpdateAddress = async (address) => {
        try {
            const { data } = await supabase
                .from('address')
                .upsert([{ ...addressPrefilled.value, ...address }])
                .select('*')
                .single()

            return data
        } catch (error) {
            throw error
        }
    }

    const createOrUpdateLocation = async (location) => {
        try {
            const { data } = await supabase
                .from('location')
                .upsert([{ ...locationPrefilled.value, ...location }])
                .select('*')
                .single()

            return data
        } catch (error) {
            throw error
        }
    }

    const updateLocationById = async (location_id: number, location) => {
        try {
            const { data } = await supabase
                .from('location')
                .update(location)
                .eq('location_id', location_id)

            return data
        } catch (error) {
            throw error
        }
    }

    const handleSubmit = async () => {
        try {
            const { brand_color, location_id, location_name, target_area_id, target_audience_id, slots, ...address } = getNode('generalForm')?.value
            const { address_id } = await createOrUpdateAddress(address)
            const location = { location_id, address_id, brand_color, location_name, target_area_id }
            await createOrUpdateLocation(location)
        } catch (error) {
            throw error
        }
    }

    const getLocations = async (): Promise<Tables<'location'>> => {
        const { data } = await supabase
            .from('location')
            .select()
            .single()

        return data as unknown as Tables<'location'>
    }

    const getLocationById = async (id: number) => {
        try {
            const { data, error } = await supabase
                .from('location')
                .select('*')
                .eq('location_id', id)
                .single()

            if (error) {
                throw error
            }

            return data
        } catch (error) {
            throw error
        }
    }

    onMounted(async () => {
        if (prefillForm && (isObjectEmpty(locationPrefilled.value) || isObjectEmpty(addressPrefilled.value))) {
            try {

                // company has no location yet so we cannot prefill it
                if (!locationId) return

                let { data: locationData, error } = await supabase
                    .from('location')
                    .select('*')
                    .eq('location_id', locationId)
                    .single()

                if (!locationData) return

                locationData = removeEmptyObjectValues(locationData)

                locationPrefilled.value = locationData

                const { data: addressData } = await supabase
                    .from('address')
                    .select('*')
                    .eq('address_id', locationPrefilled.value.address_id)
                    .maybeSingle()

                if (!addressData) return

                addressPrefilled.value = addressData

                getNode('generalForm')?.input({
                    ...locationPrefilled.value,
                    ...addressPrefilled.value
                })
            } catch (error) {
                throw error
            }
        }
    })

    return {
        schema,
        form,
        handleSubmit,
        getLocations,
        getLocationById,
        updateLocationById,
    };
}
