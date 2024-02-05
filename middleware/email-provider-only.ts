// makes sure that only user who are registered via email can access routes this middleware is assigned to
export default defineNuxtRouteMiddleware((to, _from) => {
    const user = useSupabaseUser()

    if (user.value?.app_metadata.provider !== 'email') {
        return abortNavigation()
    }
})
