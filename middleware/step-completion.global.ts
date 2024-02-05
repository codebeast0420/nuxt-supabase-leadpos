import type { UserStep, UserStepKey } from '~/types/user'
import * as ROUTES from '~/constants/routes'

export default defineNuxtRouteMiddleware((to, _from) => {
  if (to.path.startsWith(ROUTES.PORTAL_ROOT_ROUTE)) {
    const user = useSupabaseUser()
    const steps: UserStepKey[] = [
      'payment-method',
      'industry',
    ];

    if (user && user.value) {
      const userMetadata = user.value.user_metadata;

      // navigate to first step if no steps have been completed
      if (!userMetadata.completed_steps) return navigateTo(`/welcome/${steps[0]}`)

      // Check which steps are not completed
      const incompleteSteps = steps.filter((step) => !userMetadata.completed_steps[step]);

      if (incompleteSteps.length > 0) {
        if (to.path.includes(incompleteSteps[0]))

        // Redirect to the appropriate step
        return navigateTo(`/welcome/${incompleteSteps[0]}`);
      }
    }
  }
})
