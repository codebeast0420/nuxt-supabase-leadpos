// in progress... Most of Stripe handling is currently inside useStepForm.ts
import Stripe from 'stripe'
import { User } from '@supabase/supabase-js';

export const useStripe = () => {
    const { locale } = useI18n();
    const { getCompany } = useCompany();
    const getStripeCustomer = async (customerId: string): Promise<Stripe.Customer | undefined> => {
        try {
            const customer = await $fetch<Stripe.Customer>(`/api/stripe-customer/${customerId}`, {
                method: 'get',
            })

            if (!customer) throw Error('No customer returned from server')

            return customer
        } catch (error) {
            console.error(error)
        }
    }

    const getStripeCustomerPaymentMethod = async (customerId: string): Promise<Stripe.PaymentMethod | undefined> => {
        try {
            const paymentMethod = await $fetch<Stripe.PaymentMethod>(`/api/stripe-customer/${customerId}/payment-method`, {
                method: 'get',
            })

            if (!paymentMethod) throw Error('No payment methods returned from server')

            return paymentMethod
        } catch (error) {
            console.error(error)
        }
    }

    const getStripeCustomerSubscription = async (customerId: string): Promise<Stripe.Subscription | undefined> => {
        try {
            const subscription = await $fetch<Stripe.Subscription>(`/api/stripe-customer/${customerId}/subscription`, {
                method: 'get',
            })

            if (!subscription) throw Error('No subscription returned from server')

            return subscription
        } catch (error) {
            console.error(error)
        }
    }

    const getStripeProduct = async (productId: string): Promise<Stripe.Product | undefined> => {
        try {
            const product = await $fetch<Stripe.Product>(`/api/stripe/product/${productId}`, {
                method: 'get',
            })

            if (!product) throw Error('No product returned from server')

            return product
        } catch (error) {
            console.error(error)
        }
    }

    const attachStripeCustomerPaymentMethod = async (customerId: string, paymentMethod: string): Promise<Stripe.PaymentMethod | undefined> => {
        try {
            const paymentMethodRes = await $fetch<Stripe.PaymentMethod>(`/api/stripe-customer/${customerId}/attach-payment-method`, {
                method: 'post',
                body: {
                    paymentMethod
                }
            })

            if (!paymentMethodRes) throw Error('No customer returned from server')

            return paymentMethodRes
        } catch (error) {
            console.error(error)
        }
    }

    const updateStripeCustomer = async (customerId: string, name: string, address: Stripe.Address, companyName: string): Promise<Stripe.Customer | undefined> => {
        try {
            const customer = await $fetch<Stripe.Customer>(`/api/stripe-customer/${customerId}`, {
                method: 'post',
                body: {
                    name,
                    address,
                    companyName
                }
            })

            if (!customer) throw Error('No customer returned from server')

            return customer
        } catch (error) {
            console.error(error)
        }
    }

    const updateStripeCustomerDefaultPaymentMethod = async (customerId: string, paymentMethodId: string): Promise<Stripe.Customer | undefined> => {
        try {
            const customer = await $fetch<Stripe.Customer>(`/api/stripe-customer/${customerId}/default-payment-method`, {
                method: 'post',
                body: {
                    paymentMethodId
                }
            })

            if (!customer) throw Error('No customer returned from server')

            return customer
        } catch (error) {
            console.error(error)
        }
    }

    const cancelSubscription = async (customerId: string): Promise<Stripe.Subscription | undefined> => {
        try {
            const subscription = await $fetch<Stripe.Subscription>(`/api/stripe-customer/${customerId}/cancel-subscription`, {
                method: 'post',
            })

            if (!subscription) throw Error('No subscription returned from server')

            return subscription
        } catch (error) {
            console.error(error)
        }
    }

    const isTrialActive = (subscription: Stripe.Subscription): boolean => {
        if (!subscription.trial_end) return false

        return subscription.status === 'trialing'
    }

    const getStripeCustomerInvoices = async (customerId: string): Promise<Stripe.Invoice[]> => {
        try {
            const invoices = await $fetch<Stripe.Invoice[]>(`/api/stripe/customer/${customerId}/invoices`, {
                method: 'get',
            })

            if (!invoices) throw Error('No invoices returned from server')

            return invoices
        } catch (error) {
            console.error(error)
        }
    }

    const stripeCreateCustomer = async (user : Ref<User | null>): Promise<Stripe.Customer> => {
		if (!user.value?.email) throw Error("Can't create Stripe customer because user has no email")

		const res = await $fetch<Stripe.Customer>('/api/stripe-customer', {
			method: 'post',
			body: {
				email: user.value?.email,
				preferred_locales: [locale.value, 'en']
			}
		})

		if (!res) throw Error('No customer returned from server')

		return res
	}

    const stripeAttachPaymentMethod = async (paymentMethod: Ref<Stripe.PaymentMethod | null>, customer: Ref<Stripe.Customer | null>): Promise<Stripe.PaymentMethod> => {
        try {
			const res = await $fetch('/api/stripe-attach-payment-method', {
				method: 'post',
				body: {
					paymentMethodId: paymentMethod.value,
					customerId: customer.value?.id
				}
			})

			if (!res) throw Error('No paymentMethod returned from server')

			return res
		} catch (error) {
			console.error(error)
		}
	}

    const stripeUpdateCustomer = async (customer: Ref<Stripe.Customer | null>, name: Ref<string | null>, address: Object) => {
		try {
			const data = await getCompany()

			await nextTick()

			const res = await $fetch<Stripe.Customer>(`/api/stripe-customer/${customer.value!.id}`, {
				method: 'post',
				body: {
					name: name.value,
					address: address.value,
					companyName: data?.name
				}
			})

			if (!res) throw Error('No customer returned from server')

			customer.value = res
		} catch (error) {
			console.error(error)
		}
	}

    const stripeGetPriceById = async (): Promise<Stripe.Price> => {
		try {
			const res = await $fetch<Stripe.Price>('/api/get-stripe-price', {
				method: 'get',
			})

			if (!res) throw Error('No price returned from server')

			return res
		} catch (error) {
			console.error(error)
		}
	}

    const stripeSubscribeUser = async (customer: Ref<Stripe.Customer | null>, price: Ref<Stripe.Price | null>, paymentMethod: Ref<Stripe.PaymentMethod | null>,) => {

        try {
			const res = await $fetch<Stripe.Subscription>('/api/create-stripe-subscription', {
				method: 'post',
				body: {
					customerId: customer.value?.id,
					price: price.value?.id,
					paymentMethod: paymentMethod.value
				}
			})

			if (!res) throw Error('No subscription returned from server')

			return res
		} catch (error) {
			console.error(error)
		}

	}

    return {
        getStripeCustomer,
        updateStripeCustomer,
        getStripeCustomerPaymentMethod,
        getStripeCustomerSubscription,
        getStripeCustomerInvoices,
        getStripeProduct,
        attachStripeCustomerPaymentMethod,
        updateStripeCustomerDefaultPaymentMethod,
        cancelSubscription,
        isTrialActive,
        stripeCreateCustomer,
        stripeAttachPaymentMethod,
        stripeUpdateCustomer,
        stripeGetPriceById,
        stripeSubscribeUser
    };
}
