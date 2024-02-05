<template>
    <Heading>{{ $t('campaign_create.details.title') }}</Heading>
    <FormKit
        v-model="formData"
        type="form"
        id="campaignCreateDetailsForm"
        @submit="handleSubmit"
        :actions="false"
        >
        <FormKit type="text"
            id="name"
            name="name"
            :label="$t('campaign.create_form.name')"
            validation="required"
        />
        <FormKit type="text"
            id="heading_text"
            name="heading_text"
            :label="$t('campaign.create_form.heading_text')"
            validation="required"
        />
        <FormKit type="textarea"
            id="primary_text"
            name="primary_text"
            rows="10"
            :label="$t('campaign.create_form.primary_text')"
            validation="required"
        />
        <FormKit type="textarea"
            id="description"
            name="description"
            rows="10"
            :label="$t('campaign.create_form.description')"
            validation="required"
        />
        <FormKit
            :plugins="[previewImage]"
            type="file"
            :label="$t('campaign.create_form.images')"
            name="images"
            accept=".jpg,.png"
            validation="required"
            :classes="{
                inner: 'bg-gray px-12 h-56 flex items-center justify-center'
            }"
            :sections-schema="{
                prefix: {
                    if: '$previewUrl',
                    $el: 'img',
                    attrs: {
                        class: 'max-h-full',
                        src: '$previewUrl'
                    }
                }
            }"
        >
            <template #noFilesIcon>
                <Button>{{ $t('campaign.create_form.upload_image') }}</Button>
            </template>
            <template #fileList></template>
        </FormKit>
    </FormKit>
</template>

<script setup lang="ts">
import { getNode, FormKitNode } from "@formkit/core";
import cloneDeep from 'lodash/cloneDeep';

const props = defineProps({
    initialState: {
        type: Object,
        default: () => ({})
    },
    campaignId: {
        type: Number
    }
})

const campaignCreateImagePreviewUrl = useState('campaignCreateImagePreviewUrl')
const { createOrUpdateCampaign } = useCampaign()
const { createTemplate, updateTemplate } = useCampaignTemplate()

const formData = ref({})
const initialStateCopy = ref({})

const context = inject<'create' | 'edit'>('context')

onMounted(() => {
    initialStateCopy.value = cloneDeep(props.initialState)
    getNode('campaignCreateDetailsForm')?.input(props.initialState)
})

function previewImage(node: FormKitNode) {
    node.context!.previewUrl = ''

     node.on('input', ({ payload }) => {
        if (Array.isArray(payload) && payload.length > 0) {
            const fileWrapper = payload[0];
            if (fileWrapper.file && fileWrapper.file instanceof File) {
                node.context!.previewUrl = URL.createObjectURL(fileWrapper.file);
                campaignCreateImagePreviewUrl.value = node.context!.previewUrl
            } else if (typeof fileWrapper === 'string') {
                campaignCreateImagePreviewUrl.value = fileWrapper
                node.context!.previewUrl = fileWrapper;
            }
        } else {
            campaignCreateImagePreviewUrl.value = ''
            node.context!.previewUrl = '';
        }
    });

    return false
}

const handleSubmit = async () => {
    try {
        let campaign_template_id;

        if (context === 'create') {
            ({ campaign_template_id } = await createTemplate(formData.value))
        } else if (context === 'edit') {
            ({ campaign_template_id } = await updateTemplate(formData.value))
        }

        const { campaign_id } = await createOrUpdateCampaign({
            campaign_id: props.campaignId,
            campaign_template_id
        });
        return { campaign_id, campaign_template_id }
    } catch (error) {
        console.error(error);
    }
}

defineExpose({ handleSubmit })
</script>
