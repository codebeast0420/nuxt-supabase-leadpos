export type UserStepKey = 'payment-method' | 'industry'

export interface UserStep {
  key: UserStepKey,
  title: string,
  pageTitle: string,
  route: string
}
