import { FormKitSchemaDefinition } from '@formkit/core'
import { UserStepKey } from 'types/user'
import { watch, onMounted } from 'vue'
import { Stripe as StripeClient, loadStripe, StripeElement, StripeElements } from "@stripe/stripe-js";
import Stripe from 'stripe'
import * as ROUTES from '~/constants/routes'
import { Tables, Database } from '~/types/supabase-generated.types'

export const usePaymentMethodForm = () => {
	const { t, locale } = useI18n()
	const user = useSupabaseUser()
	const { updateCompany, getCompanyId } = useCompany()
	const { markStepAsCompleted } = useSteps()
	var elements = ref<StripeElements | null>(null)
	var address = reactive({ value: null })
	var name = ref<string | null>(null)
	var customer = ref<Stripe.Customer | null>(null)
	var paymentMethod = ref<Stripe.PaymentMethod | null>(null)
	var price = ref<Stripe.Price | null>(null)
	var stripe = ref<StripeClient | null>(null)
	const { stripeCreateCustomer, stripeAttachPaymentMethod, stripeUpdateCustomer, stripeGetPriceById, stripeSubscribeUser } = useStripe()

	const init = async () => {
		stripe.value = await loadStripe(useRuntimeConfig().public.stripePublicKey as string)

		if (!stripe.value) throw Error('Stripe not loaded')

		customer.value = await stripeCreateCustomer(user);

		const { client_secret } = await $fetch<Stripe.SetupIntent>('/api/create-stripe-setup-intent', {
			method: 'post',
			body: {
				customerId: customer.value?.id
			}
		})
		let addressElement: StripeElement | null = null;
		let paymentElement: StripeElement | null = null;

		const mountStripeElements = async () => {
			if (!client_secret) throw Error('No client_secret returned from server')

			elements.value = stripe.value!.elements({ clientSecret: client_secret })
			if (!elements) {
				throw Error('Stripe Elements not loaded')
			}

			addressElement = elements.value.create('address', { mode: 'billing' });
			paymentElement = elements.value.create('payment')
			addressElement.mount('#address-element')
			paymentElement.mount('#payment-element')

			addressElement.on('change', (event) => {
				if (event.complete) {
					// @ts-ignore
					address.value = event.value.address;
					name.value = event.value.name;
				}
			})
		}

		await nextTick()
				await mountStripeElements()
	}

	watch(user, async (newUser, oldUser) => {
		if (newUser) {
			await init();
		}
	}, { immediate: true });

	const stripeFormSchema: FormKitSchemaDefinition = [
		{
			$el: 'div',
			attrs: {
				id: 'address-element',
			}
		},
		{
			$el: 'div',
			attrs: {
				id: 'payment-element',
				class: 'mt-3 mb-5'
			}
		},
		{
			$formkit: 'submit',
			label: t('form.payment_method.submit'),
		},
		{
			$el: 'div',
			attrs: {
				class: 'text-tertiary -mt-4 text-sm'
			},
			children: t('form.payment_method.disclaimer')
		},
		{
			$el: 'div',
			attrs: {
				class: 'grid grid-cols-2 gap-4 mt-8',
			},
			children: [
				// free trial USP
				{
					$el: 'div',
					attrs: {
						class: 'flex flex-row',
					},
					children: [
						{
							$el: 'div',
							attrs: {
								class: 'flex items-center justify-center bg-gray-200 rounded-full h-8 w-8 mr-3',
							},
							children: [
								{
									$cmp: 'SvgoCheck',
									props: {
										class: 'w-6 h-6',
									}
								},
							],
						},
						{
							$el: 'div',
							children: [
								{ $el: 'div', attrs: { class: 'text-sm font-semibold' }, children: t('usp.second.heading') },
								{ $el: 'div', attrs: { class: 'text-sm text-gray-500' }, children: t('usp.second.subheading') },
							],
						},
					]
				},
				// secure payment USP
				{
					$el: 'div',
					attrs: {
						class: 'flex flex-row',
					},
					children: [
						{
							$el: 'div',
							attrs: {
								class: 'flex items-center justify-center bg-gray-200 rounded-full h-8 w-8 mr-3',
							},
							children: [
								{
									$cmp: 'SvgoSecurePayment',
									props: {
										class: 'w-6 h-6',
									}
								},
							],
						},
						{
							$el: 'div',
							children: [
								{ $el: 'div', attrs: { class: 'text-sm font-semibold' }, children: t('usp.first.heading') },
								{ $el: 'div', attrs: { class: 'text-sm text-gray-500' }, children: t('usp.first.subheading') },
							],
						},
					]
				},
			],
		},
	]

	const stripeForm = reactive({
		company_name: '',
	})

	const handleSubmit = async () => {
		try {
			await nextTick()

			// @ts-ignore
			const { error, setupIntent } = await stripe.value!.confirmSetup({
				// @ts-ignore
				elements: elements.value,
				// @ts-ignore
				redirect: 'if_required'
			})
			// @ts-ignore
			const payment_method = setupIntent?.payment_method || null

			if (error) throw Error(error.message)

			if (!payment_method) throw Error('No payment method returned')

			paymentMethod.value = payment_method

			await stripeUpdateCustomer(customer, name, address);
			await stripeAttachPaymentMethod(paymentMethod, customer);

			price.value = await stripeGetPriceById()
			await stripeSubscribeUser(customer, price, paymentMethod);
			const companyId = await getCompanyId()

			await updateCompany({ stripe_customer_id: customer.value?.id }, companyId);
			
			markStepAsCompleted('payment-method')

			navigateTo(ROUTES.ADD_INDUSTRY)
		} catch (error) {
			console.error('Fehler beim Absenden', error);
		}
	}

	return { schema: stripeFormSchema, form: stripeForm, handleSubmit }
}

export const useIndustryForm = () => {
	const { t } = useI18n()
	let form = ref({ industry_id: null, otherIndustryInput: null })
	let industryFormSchema = ref<FormKitSchemaDefinition>([])
	const { updateCompany } = useCompany()
	const supabase = useSupabaseClient()
	const { markStepAsCompleted } = useSteps()

	const init = async () => {
		const industries = await supabase
			.from('industry')
			.select('industry_id, name, emoji')
			.eq('is_public', true)
			.then((res) => res.data)

		if (!industries) throw Error('No industries returned from server')

		// @ts-ignore
		const industryRadioOptions = industries.map((industry: Tables<'industry'>) => {
			return {
				// @ts-ignore
				label: `${industry.emoji} ${t(industry.name)}`,
				value: industry.industry_id,
			}
		})

		form.value = {
			industry_id: industryRadioOptions[0].value,
			otherIndustryInput: null
		}

		industryFormSchema.value = [
			{
				$formkit: 'radio',
				name: 'industry_id',
				options: [
					...industryRadioOptions,
					{
						label: `⚙️ ${t('form.industry.other')}`,
						value: 'other',
					}
				],
				optionClass: 'rounded-lg shadow-custom px-4 mb-5',
				labelClass: 'inline-block w-full py-5',
			},
			{
				if: '$industry_id === "other"',
				$formkit: 'text',
				name: 'otherIndustryInput',
				placeholder: t('form.industry.other_placeholder'),
				outerClass: '-mt-5',
				validation: 'required',
			},
			{
				$el: 'div',
				attrs: {
					class: '-mt-2'
				},
				children: [{
					$formkit: 'submit',
					label: t('form.industry.submit'),
				}]
			}
		]
	}


	onMounted(async () => {
		await init()
	})

	const handleSubmit = async () => {
		try {
			await updateCompany({ industry_id: form.value.industry_id }, useUserStore().company.company_id)

			markStepAsCompleted('industry')
			setTimeout(() => {
				navigateTo(ROUTES.START_PAGE_AFTER_LOGIN)
			}, 1000);
			
		} catch (error) {
			console.error(error)
		}

	}

	return { schema: industryFormSchema, form, handleSubmit }
}

export const useStepForm = (stepKey: UserStepKey) => {
	switch (stepKey) {
		case 'payment-method':
			return usePaymentMethodForm();

		case 'industry':
			return useIndustryForm();

		default:
			throw new Error(`Unsupported stepKey: ${stepKey}`);
	}
}
