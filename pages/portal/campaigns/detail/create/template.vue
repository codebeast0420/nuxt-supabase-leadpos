<template>
    <DataTableCrudHeader :title="$t('campaigns.create.template.title')">
        <div class="space-x-4 flex">
            <FormKit
                v-model="filterByIndustry"
                v-if="industriesMapped"
                outerClass="w-[150px] !mb-0"
                type="dropdown"
                name="industry_filter"
                placeholder="Industry"
                :options="industriesMapped"
                multiple
                @input="filterByIndustryWasChanged = true"
            />
            <FormKit
                v-model="filterByLanguage"
                outerClass="w-[150px] !mb-0"
                type="dropdown"
                name="language_filter"
                :options="[{ label: 'English', value: 'en' }, { label: 'Deutsch', value: 'de' }]"
            />
        </div>
    </DataTableCrudHeader>
    <CampaignTemplatesList v-if="!industryOptionsCallPending" :sort-by="sortBy" :filter-by="filterBy" />
</template>

<script setup lang="ts">
import { IFilterBy, ISortBy } from '@/types/campaignTemplates'
const { t, locale } = useI18n()
const industryId = useUserStore().company?.industry_id
const industriesMapped = ref(null)
const filterByIndustry = ref([])
const filterByIndustryWasChanged = ref(false)
const filterByLanguage = ref(locale.value)

const { data: industries, pending: industryOptionsCallPending } = useAsyncData('industryOptions', async () => {
    const industries = await useIndustries().getIndustries()

    industriesMapped.value = industries.map(industry => ({
        label: industry.emoji + ' ' + t(industry.name),
        value: industry.industry_id,
    }));

    return industries
})

const sortBy = computed((): ISortBy => {
    return {
        industryId: industryId,
    }
})

const allIndustryIds = computed(() => {
    return industries ? industries.value.map(industry => industry.industry_id) : [];
})

const filterBy = computed((): IFilterBy => {
    return {
        languageCode: filterByLanguage.value,
        industryIds: filterByIndustryWasChanged.value
        ? filterByIndustry.value
        : allIndustryIds.value
    }
})
</script>
