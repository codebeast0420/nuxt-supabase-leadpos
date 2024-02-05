<template>
    <FormKit id="generalForm" type="form" @submit="handleSubmit" :actions="false">
        <FormKitSchema :schema="schema" :data="form" />
    </FormKit>
</template>

<script setup lang="ts">
const { schema, form, handleSubmit } = useLocation(true)

defineExpose({ handleSubmit })
</script>
