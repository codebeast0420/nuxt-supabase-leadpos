import { FormKitSchemaDefinition, getNode } from '@formkit/core'
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import { TargetAreaOptions, TargetGroupContext } from '~/types/campaign'

export const useTargetArea = (
    context: TargetGroupContext,
    options: TargetAreaOptions
) => {
    const { isPrefillForm, campaignId, targetAreaId, locationId } = options

    const { t } = useI18n()
    const supabase = useSupabaseClient()
    let targetAreaPrefilled = {}
    const { isObjectEmpty } = useUtils()
    const { getLocationById, updateLocationById } = useLocation()
    const { getCampaignById, updateCampaignById } = useCampaign()

    const form = {
        target_area_type: 'certain_cities'
    }

    const schema: FormKitSchemaDefinition = [
        {
            $formkit: 'select',
            name: 'target_area_type',
            key: 'target_area_type',
            id: 'target_area_type',
            label: t('form.target_area.most_customer_come_from_most'),
            validation: 'required',
            options: [
                {
                    label: t('form.target_area.certain_cities'),
                    value: 'certain_cities'
                },
                {
                    label: t('form.target_area.all_over_city'),
                    value: 'all_over_city'
                },
                {
                    label: t('form.target_area.certain_zip_codes'),
                    value: 'certain_zip_codes'
                },
            ],
        },
        // TODO: Waiting for help: https://discord.com/channels/793529058377072650/940340536747896842/1150598539634806884
        {
            if: '$target_area_type === "certain_cities"',
            $formkit: 'taglist',
            name: 'cities',
            key: 'cities',
            id: 'cities',
            label: t('form.target_area.cities'),
            allowNewValues: true,
            validation: 'required',
        },
        {
            if: '$target_area_type === "certain_zip_codes"',
            $formkit: 'taglist',
            name: 'zip_codes',
            key: 'zip_codes',
            id: 'zip_codes',
            label: t('form.target_area.zip_codes'),
            allowNewValues: true,
            validation: 'required',
        },
        {
            if: '$target_area_type === "all_over_city"',
            $formkit: 'text',
            name: 'city',
            key: 'city',
            id: 'city',
            label: t('form.target_area.city'),
            validation: 'required',
        },
        {
            if: '$target_area_type === "certain_cities" || $target_area_type === "all_over_city"',
            $formkit: 'slider',
            label: t('form.target_area.radius'),
            name: 'radius_in_km',
            key: 'radius_in_km',
            tooltip: true,
            tooltipFormat: (value: number) => `${value} km`,
            min: 0,
            max: 80,
        },
    ]

    const createOrUpdateTargetArea = async (targetArea, locationId) => {
        try {
            const { data, error } = await supabase
                .from('target_area')
                .upsert(targetArea)
                .select('target_area_id')
                .single()

            if (error) {
                throw error
            }

            if (error) throw error

            return data
        } catch (error) {
            throw error
        }
    }

    const updateTargetArea = async (targetArea) => {
        try {
            const { data, error } = await supabase
                .from('target_area')
                .update(targetArea)
                .eq('target_area_id', targetArea.target_area_id)
                .select('*')
                .single()

            if (error) {
                throw error
            }

            if (error) throw error

            return data
        } catch (error) {
            throw error
        }
    }

    const formHasChanges = computed((): boolean => {
        if (isObjectEmpty(targetAreaPrefilled)) return true

        return !isEqual(
            toRaw(targetAreaPrefilled),
            toRaw(getNode('targetAreaForm')?.value))
    })

    const handleSubmit = async () => {
        try {
            if (!formHasChanges.value) return true

            const { slots, ...targetArea } = getNode('targetAreaForm')?.value

            if (context === 'location') {
                if (!locationId) throw Error('locationId is required when context is location')

                const { target_area_id } = await createOrUpdateTargetArea(targetArea, locationId)

                await updateLocationById(locationId, { target_area_id })
            } else if (context === 'campaign') {
                if (!campaignId) throw Error('campaignId is required when context is campaign')

                const updatedTargetArea = await updateTargetArea(targetArea)

                await updateCampaignById(campaignId, { target_area_id: updatedTargetArea.target_area_id })
            }

            return true
        } catch (error) {
            throw error
        }
    }

    const getTargetAreaByLocationId = async (id: number) => {
        try {
            const { target_area_id, error: getLocationByIdError } = await getLocationById(id)

            if (!target_area_id) return null

            if (getLocationByIdError) throw getLocationByIdError

            const { data, error } = await supabase
                .from('target_area')
                .select('*')
                .eq('target_area_id', target_area_id)
                .single()

            if (error) throw error

            return data
        } catch (error) {
            throw error
        }
    }

    const getTargetAreaByCampaignId = async (campaign_id: number) => {
        try {
            const { target_area_id, error: getTargetAreaByCampaignIdError } = await getCampaignById(campaign_id)

            if (!target_area_id) return null

            if (getTargetAreaByCampaignIdError) throw getTargetAreaByCampaignIdError

            const { data, error } = await supabase
                .from('target_area')
                .select('*')
                .eq('target_area_id', target_area_id)
                .single()

            if (error) throw error

            return data
        } catch (error) {
            throw error
        }
    }

    const prefillForm = async (context: TargetGroupContext) => {
        let targetArea;

        try {
            if (context === 'location') {
                if (!locationId) throw Error('locationId is required when context is location')

                targetArea = await getTargetAreaByLocationId(locationId)

                if (!targetArea) return
            } else if (context === 'campaign') {
                if (!campaignId) throw Error('campaignId is required when context is campaign')

                targetArea = await getTargetAreaByCampaignId(campaignId)

                if (!targetArea) return
            }

            if (!targetArea) throw Error('targetArea is required')

            targetAreaPrefilled = cloneDeep(targetArea)
            getNode('targetAreaForm')?.input({ ...targetAreaPrefilled })
        } catch (error) {
            throw error
        }
    }

    onMounted(async () => {
        if (isPrefillForm && (isObjectEmpty(targetAreaPrefilled))) {
            try {
                prefillForm(context)
            } catch (error) {
                throw error
            }
        }
    })

    return { schema, handleSubmit, form }
}
