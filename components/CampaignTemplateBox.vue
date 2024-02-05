<template>
    <div class="relative group">
        <!-- Image -->
        <div class="relative z-0">
            <img :src="template.images[0]" alt=""
                class="w-full aspect-[191/100] object-cover rounded-lg transition-all duration-300 group-hover:opacity-80">
            <!-- Buttons container -->
            <div
                class="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center z-20 transition-all transform duration-300 opacity-0 group-hover:opacity-100">
                <Button
                    class="m-1"
                    :to="CREATE_NEW_CAMPAIGN_DETAIL_CREATE.replace(':campaignTemplateId', template.campaign_template_id)">{{ $t('button.action.choose' )}}
                </Button>
                <Button
                    class="m-1"
                    variant="light"
                    @click="showPreview = true"
                >
                    {{ $t('button.action.preview') }}
                </Button>
            </div>
            <!-- Hover overlay -->
            <div
                class="absolute inset-0 bg-black bg-opacity-0 opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-lg flex justify-center items-center z-10">
            </div>
        </div>

        <!-- Text content -->
        <div class="mt-4">
            <strong>{{ template.name }}</strong>
            <small class="block text-muted truncate">{{ template.description }}</small>
        </div>
    </div>
    <Modal
        :is-open.sync="showPreview" @update:isOpen="showPreview = $event"
        :title="$t('campaign_template.preview_modal.title')"
        size="fit-content"
        :show-cancel-button="true"
        :show-ok-button="true"
        ok-button-label="button.action.choose"
        @ok="() => $router.push(CREATE_NEW_CAMPAIGN_DETAIL_CREATE.replace(':campaignTemplateId', template.campaign_template_id))"
    >
        <CampaignTemplatePreview :template="template" />
    </Modal>
</template>

<script setup lang="ts">
import { CREATE_NEW_CAMPAIGN_DETAIL_CREATE } from '~/constants/routes'
const showPreview = ref(false)
const campaignPreviewId = ref<number | null>(null)

defineProps({
    template: {
        type: Object,
        required: true,
    }
})
</script>
