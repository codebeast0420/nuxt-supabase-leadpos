<template>
    <Alert variant="warning" :title="title">
        <p>{{ description }}</p>
        <Button @click="handleClick" variant="custom"
            class="mt-3 rounded-md bg-yellow-50 px-2 py-1.5 text-sm font-medium text-yellow-800 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 focus:ring-offset-yellow-50">
            {{ buttonLabel }}
        </Button>
    </Alert>
</template>

<script setup lang="ts">
const { company, updateCompany } = useCompany()
const { facebookPages } = useFacebook()
const isFacebookConnectModalOpen = useState('isFacebookConnectModalOpen', () => false)
const { t } = useI18n()
const route = useRoute()

const isFacebookAccountConnected = computed(() => {
    return !!company.value?.facebook_account_id
})

const isFacebookPagesConnected = computed(() => {
    return !!company.value?.active_facebook_page_id
})

const title = computed(() => {
    if (!isFacebookAccountConnected.value) {
        return t('facebook.account.not_connected.title')
    } else if (!isFacebookPagesConnected.value) {
        return t('facebook.pages.not_connected.title')
    }
})

const description = computed(() => {
    if (!isFacebookAccountConnected.value) {
        return t('facebook.account.not_connected.description')
    } else if (!isFacebookPagesConnected.value) {
        return t('facebook.pages.not_connected.description')
    }
})

const buttonLabel = computed(() => {
    if (!isFacebookAccountConnected.value) {
        return t('facebook.account.not_connected.action.connect')
    } else if (!isFacebookPagesConnected.value) {
        return t('facebook.pages.not_connected.action.connect')
    }
})

const handleClick = async () => {
    if (!isFacebookAccountConnected.value) {
        await connectFacebookAccount()
    } else if (!isFacebookPagesConnected.value) {
        openFacebookPagesSelectModal()
    }
}

const connectFacebookAccount = async () => {
    // TODO: https://linear.app/newwwagency/issue/LEA-147
    await navigateTo('https://facebook.com', {
        external: true
    });
}

watch(route, async (newRoute) => {
    // TODO: replace with whatever query facebook returns after connecting account. Then, store the correct facebook account id into the database
    if (newRoute.query.facebook_account_id) {
        await updateCompany({
            facebook_account_id: parseInt(newRoute.query.facebook_account_id as string)
        })
    }
})

const openFacebookPagesSelectModal = () => {
    isFacebookConnectModalOpen.value = true
}
</script>
