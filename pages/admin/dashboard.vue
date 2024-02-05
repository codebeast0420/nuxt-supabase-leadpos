<template>
    <div class="container">
        <h1>Dashboard</h1>
        <button @click="supabase.auth.signOut">Sign Out</button>
    </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
</script>
