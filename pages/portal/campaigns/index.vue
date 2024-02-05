<template>
    <EmptyState v-if="!data" thing="campaigns" :create-new-route="CREATE_NEW_CAMPAIGN" />
</template>

<script setup lang="ts">
import { CREATE_NEW_CAMPAIGN } from '~/constants/routes'
const { hasCampaigns } = useCampaign()

const { data } = await useAsyncData(
    'hasCampaigns',
    () => hasCampaigns()
)
</script>
