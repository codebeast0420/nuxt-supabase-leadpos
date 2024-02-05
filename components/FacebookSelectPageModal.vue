<template>
    <Modal :title="$t('facebook_account_not_connected.modal.connect_account')" :isOpen="isFacebookConnectModalOpen">
        <FormKit type="form" @submit="selectFacebookPage">
            <FormKit
                id="facebook_page_selection"
                name="selected_facebook_page_id"
                v-if="facebookPagesOptions && facebookPagesOptions.length > 0"
                type="radio"
                :options="facebookPagesOptions"
            />
        </FormKit>
    </Modal>
</template>
<script setup lang="ts">
import { FormKitOptionsItem } from '@formkit/inputs'
const { t } = useI18n()
const isFacebookConnectModalOpen = useState('isFacebookConnectModalOpen', () => true)
const { facebookPages } = useFacebook()
const { updateCompany } = useCompany()
/** Facebook page ID of Leadpros that the user can choose */
const FACEBOOK_DEFAULT_PAGE_ID = "123"

const facebookPagesOptions = computed(() => {
    const pages = [
        {
            label: t('facebook_page_selection.default_page'),
            value: FACEBOOK_DEFAULT_PAGE_ID
        }
    ];

    if (facebookPages?.value) {
        pages.push(...facebookPages.value.map(page => ({
            label: page.name,
            value: page.facebook_page_id
        })));
    }

    return pages;
})

const selectFacebookPage = async (values: any) => {
    try {
        const { selected_facebook_page_id } = values

        await updateCompany({
            active_facebook_page_id: selected_facebook_page_id,
        })

        isFacebookConnectModalOpen.value = false
    } catch (error) {
        throw createError('Could not connect Facebook page')
    }
}
</script>
