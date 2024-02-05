import { FormKitSchemaDefinition, getNode } from '@formkit/core'
import { TargetGroupContext, TargetAudienceOptions } from '@/types/campaign'
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';

export const useTargetAudience = (
        context: TargetGroupContext,
        options: TargetAudienceOptions
    ) => {
    const { isPrefillForm, campaignId, targetAudienceId, locationId } = options

    if (context === 'campaign' && !campaignId) throw Error('campaignId is required when context is campaign')

    if (context === 'location' && !locationId) throw Error('locationId is required when context is location')

    const { t } = useI18n()
    const { isObjectEmpty } = useUtils()
    const supabase = useSupabaseClient()
    let targetAudiencePrefilled = {}
    const isLocationModalOpen = useState('isLocationModalOpen')
    const { getLocationById, updateLocationById } = useLocation()
    const { getCampaignById, updateCampaignById } = useCampaign()

    const schema: FormKitSchemaDefinition = [
        {
            $formkit: 'select',
            name: 'genders',
            label: t('form.target_audience.genders'),
            validation: 'required',
            options: [
                {
                    label: t('form.target_audience.all'),
                    value: 'all'
                },
                {
                    label: t('form.target_audience.male'),
                    value: 'male'
                },
                {
                    label: t('form.target_audience.female'),
                    value: 'female'
                },
            ],
            value: 'all'
        },
        {
            $formkit: 'slider',
            label: t('form.target_audience.age'),
            name: 'age',
            value: [18, 65],
            showInput: true,
            min: 13,
            max: 65
        }
    ]

    const form = {}

    const createOrUpdateTargetAudience = async (targetAudience) => {
        try {
            const { data, error } = await supabase
                .from('target_audience')
                .upsert([{
                    ...targetAudiencePrefilled, ...targetAudience
                }])
                .select('target_audience_id')
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

    const createTargetAudience = async (targetAudience) => {
        try {
            delete targetAudience.target_audience_id

            const { data, error } = await supabase
                .from('target_audience')
                .insert(targetAudience)
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

    const updateTargetAudience = async (targetAudience) => {
        try {
            const { data, error } = await supabase
                .from('target_audience')
                .update(targetAudience)
                .eq('target_audience_id', targetAudience.target_audience_id)
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

    // make sure to use the same structure as in the database
    const transformToDatabaseStructure = (targetAudience) => {
        const result = {
            age_min: targetAudience.age[0],
            age_max: targetAudience.age[1],
            genders: targetAudience.genders
        };

        if (targetAudience.target_audience_id) {
            result.target_audience_id = targetAudience.target_audience_id;
        }

        return result;
    };

    // make sure to use the same structure as in the form
    const transformToFormStructure = (targetAudience) => {
        const result = {
            age: [targetAudience.age_min, targetAudience.age_max],
            genders: targetAudience.genders
        };

        if (targetAudience.target_audience_id) {
            result.target_audience_id = targetAudience.target_audience_id;
        }

        return result;
    }

    const formHasChanges = computed((): boolean => {
        if (isObjectEmpty(targetAudiencePrefilled)) return true

        return !isEqual(
            toRaw(targetAudiencePrefilled),
            toRaw(getNode('targetAudienceForm')?.value))
    })

    const handleSubmit = async () => {

        try {
            if (!formHasChanges.value) return true

            const { slots, ...targetAudience } = getNode('targetAudienceForm')?.value
            const transformedTargetAudience = transformToDatabaseStructure(targetAudience)

            if (context === 'location') {
                if (!locationId) throw Error('locationId is required when context is location')

                const { target_audience_id } = await createOrUpdateTargetAudience(transformedTargetAudience)

                await updateLocationById(locationId, { target_audience_id })

                isLocationModalOpen.value = false;
            } else if (context === 'campaign') {
                if (!campaignId) throw Error('campaignId is required when context is campaign')

                const targetAudience = await updateTargetAudience(transformedTargetAudience)

                await updateCampaignById(campaignId, { target_audience_id: targetAudience.target_audience_id })
            }

            return true
        } catch (error) {
            throw error
        }
    }

    const getTargetAudienceByLocationId = async (id: number) => {
        try {
            const { target_audience_id, error: getLocationByIdError } = await getLocationById(id)

            if (!target_audience_id) return null

            if (getLocationByIdError) throw getLocationByIdError

            const { data, error } = await supabase
                .from('target_audience')
                .select('*')
                .eq('target_audience_id', target_audience_id)
                .single()

            if (error) throw error

            return data
        } catch (error) {
            throw error
        }
    }

    const getTargetAudienceByCampaignId = async (id: number) => {
        try {
            const { target_audience_id, error: getTargetAudienceByCampaignIdError } = await getCampaignById(id)

            if (!target_audience_id) return null

            if (getTargetAudienceByCampaignIdError) throw getTargetAudienceByCampaignIdError

            const { data, error } = await supabase
                .from('target_audience')
                .select('*')
                .eq('target_audience_id', target_audience_id)
                .single()

            if (error) throw error

            return data
        } catch (error) {
            throw error
        }
    }

    const getTargetAudienceById = async (id: number) => {
        try {
            const { data, error } = await supabase
                .from('target_audience')
                .select('*')
                .eq('target_audience_id', id)
                .single()

            if (error) throw error

            return data
        } catch (error) {
            throw error
        }
    }

    const prefillForm = async (context: TargetGroupContext) => {
        let targetAudience;

        try {
            if (context === 'location') {
                if (!locationId) throw Error('locationId is required when context is location')

                targetAudience = await getTargetAudienceByLocationId(locationId)

                if (!targetAudience) return
            } else if (context === 'campaign') {
                if (!campaignId) throw Error('campaignId is required when context is campaign')

                targetAudience = await getTargetAudienceByCampaignId(campaignId)

                if (!targetAudience) return
            }

            targetAudiencePrefilled = cloneDeep(transformToFormStructure(targetAudience))
            getNode('targetAudienceForm')?.input({ ...targetAudiencePrefilled })
        } catch (error) {
            throw error
        }
    }

    onMounted(async () => {
        if (isPrefillForm && (isObjectEmpty(targetAudiencePrefilled))) {
            try {
                prefillForm(context)
            } catch (error) {
                throw error
            }
        }
    })

    return { schema, form, handleSubmit }
}
