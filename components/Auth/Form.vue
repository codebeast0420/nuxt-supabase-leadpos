<template>
<div>
    <Transition enter-active-class="transform ease-out duration-500 transition" enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2" enter-to-class="translate-y-0 opacity-100 sm:translate-x-0" leave-active-class="transition ease-in duration-300" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <StatusInformationBox v-if="errorMessage" :message="errorMessage" type="error"></StatusInformationBox>
    </Transition>
    <FormKit type="form" v-model="form" @submit="handleSubmitFlow" :actions="false">
        <FormKitSchema v-if="library" :schema="schema" :library="library" />
    </FormKit>
    <AuthSwitchTo v-if="context === 'login' || context === 'signup'" :context="context" />
    <AuthPolicyNote v-if="context === 'signup'" class="mt-8" />
</div>
</template>

<script lang="ts" setup>
import { AuthContext } from '~/types/auth'
const { t } = useI18n()
import { FormKitSchema } from "@formkit/vue";
import { NuxtLink } from '@nuxtjs/composition-api'

const NuxtLink = resolveComponent('NuxtLink')
const library = markRaw({
    NuxtLink: NuxtLink,
})
const errorMessage = ref<string>("");

const props = defineProps({
    context: {
        type: String as PropType<AuthContext>,
        required: true,
    },
})

const handleSubmitFlow = async() => {
    errorMessage.value = ""; // reset value to re-render the status information box
    errorMessage.value = await handleSubmit()
}

const { schema, form, handleSubmit } = useAuthForm(props.context)

const handlePasswordVisibility = () => {
    alert('click')
}
</script>
