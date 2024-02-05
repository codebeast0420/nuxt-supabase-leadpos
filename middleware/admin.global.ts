import * as ROUTES from '~/constants/routes'

export default defineNuxtRouteMiddleware((to, _from) => {
  if (to.path.startsWith(ROUTES.ADMIN_ROOT_ROUTE)) {
    const user = useSupabaseUser()

    if (!user.value) {
      return navigateTo(ROUTES.LOGIN)
    }

    if (!user.value.app_metadata.claims_admin) {
      throw Error('You are not authenticated')
    }
  }
})
