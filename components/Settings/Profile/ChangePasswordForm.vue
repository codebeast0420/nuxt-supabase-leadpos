<template>
    <AuthForm :context="context" />
</template>

<script setup lang="ts">
import { AuthContext } from '@/types/auth';

const context: AuthContext = 'update-password'
</script>
