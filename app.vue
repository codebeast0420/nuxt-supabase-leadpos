<template>
  <div class="font-primary text-body">
    <NuxtLoadingIndicator />
    <Toaster />
    <NuxtLayout>
      <NuxtErrorBoundary>
        <template #error="{ error }">
          <Alert variant="error">
            {{ error }}
          </Alert>
        </template>
        <NuxtPage />
      </NuxtErrorBoundary>
    </NuxtLayout>
  </div>
</template>

<script setup>
const app = useNuxtApp()
let sidebarOpen = useState('sidebarOpen')
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const userStore = useUserStore()

supabase.auth.onAuthStateChange(async (event, session) => {
  console.log("session changed event", event)
  console.log("industry session", session.user.user_metadata.completed_steps?.industry);
  if (event === "USER_UPDATED" && !session.user.user_metadata.completed_steps?.industry) {
    location.reload()
  }
  console.log("session changed", session);
  if (event === 'TOKEN_REFRESHED') {
    location.reload()
  }
})

onMounted(async () => {
  if (user.value) {
    await userStore.fetchInitialData()
  }
})

app.hook('page:start', () => {
  if (sidebarOpen.value) sidebarOpen.value = false
})
</script>

<style>
@import url('~/assets/css/formkit-multistep.css');
</style>
