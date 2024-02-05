<template>
    <div class="flex space-x-4">
        <div class="w-1/5">
            <UserAvatar size="lg" />
        </div>
        <div class="w-4/5">
            <FormKit id="profileSettingsGeneralForm" type="form" @submit="handleSubmit" :submit-label="$t('form.save_changes')">
                <FormKit
                    type="text"
                    name="first_name"
                    :label="$t('profile.general.first_name')"
                    validation="required"
                />
                <FormKit
                    type="text"
                    name="last_name"
                    :label="$t('form.signup.last_name')"
                    validation="required"
                />
                <FormKit
                    type="text"
                    name="email"
                    :label="$t('form.signup.email')"
                    validation="required|email"
                />
            </FormKit>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getNode } from "@formkit/core"
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const { first_name, last_name } = useProfile()

interface FormData {
    first_name: string;
    last_name: string;
    email: string;
}

const prefillForm = () => {
    const profileSettingsGeneralForm = getNode('profileSettingsGeneralForm')

    const form: FormData = {
        first_name: first_name.value,
        last_name: last_name.value,
        email: user.value!.email!
    }

    profileSettingsGeneralForm?.input(form)
}

watch([first_name, last_name], () => {
    if (first_name.value || last_name.value) {
        prefillForm();
    }
}, { immediate: true });

const handleSubmit = async (form: FormData) => {
    const { data, error } = await supabase.auth.updateUser({ email: form.email, data: { first_name: form.first_name, last_name: form.last_name } })

    if (error) {
        return alert(error.message)
    }

    alert('Profile updated')
}

</script>
