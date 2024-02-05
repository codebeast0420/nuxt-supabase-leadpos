<template>
    <div v-if="industries && campaignTemplatesGroupedByIndustry && !isObjectEmpty(campaignTemplatesGroupedByIndustry)" class="divide-y space-y-6">
        <div v-for="industry in industries" :key="industry.industry_id" class="pt-6">
            <CampaignTemplatesGroup
                v-if="campaignTemplatesGroupedByIndustry[industry.industry_id]?.length > 0"
                :industryI18nKey="industry.name"
                :templates="campaignTemplatesGroupedByIndustry[industry.industry_id]"
            />
        </div>
    </div>
    <LoadingSpinner v-else-if="isLoading" />
    <EmptyState
        v-else-if="isObjectEmpty(campaignTemplatesGroupedByIndustry)"
        thing="campaignTemplates"
    />
</template>

<script setup lang="ts">
import { ISortBy, IFilterBy } from '@/types/campaignTemplates'
const { isObjectEmpty } = useUtils()
const { t } = useI18n()
const campaignTemplatesGroupedByIndustry = ref({})

const props = defineProps({
    sortBy: {
        type: Object as PropType<ISortBy>,
        required: true,
    },
    filterBy: {
        type: Object as PropType<IFilterBy>,
        required: true,
    },
})
const { sortBy, filterBy } = toRefs(props)

const { data: campaignTemplates, refresh: refreshCampaignTemplates, pending: pendingCampaignTemplates } = useAsyncData('defaultCampaignTemplates', async () => {
    const campaignTemplates = await useCampaignTemplate().getDefaultTemplates(filterBy.value)
    campaignTemplatesGroupedByIndustry.value = campaignTemplates.reduce((acc, template) => {
        template.industry_ids.forEach((id) => {
            if (!acc[id]) {
                acc[id] = [];
            }
            acc[id].push(template);
        });
        return acc;
    }, {});

    return campaignTemplates
})

const { data: industries, refresh: refreshIndustries, pending: pendingIndustries } = useAsyncData('industries', async () => {
    const industries = await useIndustries().getIndustries(sortBy.value, filterBy.value)
    return industries
})

watch(filterBy, () => {
    refreshIndustries()
    refreshCampaignTemplates()
}, { deep: true });

const isLoading = computed(() => {
    return pendingCampaignTemplates.value || pendingIndustries.value
})
</script>

