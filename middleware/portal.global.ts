import * as ROUTES from '~/constants/routes'

export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useSupabaseUser()

  if (to.path.startsWith(ROUTES.PORTAL_ROOT_ROUTE)) {
    if (!user.value) {
      return navigateTo(ROUTES.LOGIN)
    }

    if (user.value.app_metadata.claims_admin) {
      return navigateTo(ROUTES.ADMIN_START_PAGE_AFTER_LOGIN)
    }
  }

  if (to.path === ROUTES.BASE_URL) {
    if (!user.value) {
      return navigateTo(ROUTES.LOGIN)
    }

    if (user.value.app_metadata.claims_admin) {
      return navigateTo(ROUTES.ADMIN_START_PAGE_AFTER_LOGIN)
    }

    return navigateTo(ROUTES.START_PAGE_AFTER_LOGIN)
  }
})
