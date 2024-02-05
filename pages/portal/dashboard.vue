<template>
    <div>Hey <button @click="supabase.auth.signOut">Sign Out</button></div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
</script>
