<template>
    <div>
        <Heading class="mb-4 flex items-center">
            {{ $t('campaigns.create.template.for_industry', {
                industry: $t(industryI18nKey)
            }) }}
            <Badge class="ml-2">{{ amountOfTemplates }}</Badge>
        </Heading>
        <div class="grid grid-cols-3 gap-x-4 gap-y-7">
            <CampaignTemplateBox v-for="template in templates" :template="template" />
        </div>
    </div>
</template>

<script setup lang="ts">
const { templates } = defineProps({
    industryI18nKey: {
        type: String,
        required: true,
    },
    templates: {
        type: Array,
        required: true,
    }
})

const amountOfTemplates = computed(() => {
    if (!templates) return 0
    return templates.length
})
</script>
