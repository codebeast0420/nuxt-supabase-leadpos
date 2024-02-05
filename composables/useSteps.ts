import { UserStep, UserStepKey } from '@/types/user'
import * as ROUTES from '~/constants/routes'

export const useSteps = (currentStepKey?: UserStepKey) => {
    const { t } = useI18n()

    const steps: UserStep[] = [
        {
            key: 'payment-method',
            title: t('step.payment_method.title'),
            pageTitle: t('step.payment_method.page_title'),
            route: ROUTES.ADD_PAYMENT_METHOD
        },
        {
            key: 'industry',
            title: t('step.industry.title'),
            pageTitle: t('step.industry.page_title'),
            route: ROUTES.ADD_INDUSTRY
        }
    ]

    const getStepByKey = (stepKey: UserStepKey): UserStep | undefined => {
        return steps.find((step) => step.key === stepKey)
    }

    const headings = computed(() => {
        return steps.map((step) => {
            return step.pageTitle
        })
    })

    const heading = computed(() => {
        if (!currentStepKey) return ''

        const step = getStepByKey(currentStepKey)

        return step ? step.pageTitle : ''
    })

    const markStepAsCompleted = async (stepKey: UserStepKey, redirectToNextStep = true) => {
        try {
                        const supabase = useSupabaseClient()
            const user = useSupabaseUser()
            const userMetadata = user.value?.user_metadata

            if (!userMetadata) return

            const completedSteps = {
                ...userMetadata.completed_steps,
                [stepKey]: true
            }

            supabase.auth.updateUser({
                data: { completed_steps: completedSteps }
            })

        } catch (error) {
            console.log('error', error)
        }

    }

    return { steps, headings, heading, getStepByKey, markStepAsCompleted }
}
