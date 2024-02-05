<template>
	<div>
		<Step :step-key="stepKey" />
	</div>
</template>

<script setup lang="ts">
import { UserStepKey } from '@/types/user'
definePageMeta({
	layout: 'steps'
})

const stepKey = 'payment-method' as UserStepKey
</script>
