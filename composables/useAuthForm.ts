import { FormKitSchemaDefinition } from '@formkit/core'
import { AuthContext } from '@/types/auth'
import * as ROUTES from '~/constants/routes'

export const useSignupForm = () => {
	const supabase = useSupabaseClient<Database>()
	const router = useRouter()
	const { t } = useI18n()

	const signupSchema: FormKitSchemaDefinition = [
		{
			$formkit: 'text',
			name: 'company_name',
			validation: 'required',
			label: t('form.payment_method.company_name'),
		},
		{
			$el: 'div',
			attrs: { class: 'form-side-by-side' },
			children: [
				{
					$formkit: 'text',
					name: 'first_name',
					label: t('form.signup.first_name'),
				},
				{
					$formkit: 'text',
					name: 'last_name',
					label: t('form.signup.last_name'),
				},
			]
		},
		{
			$formkit: 'text',
			name: 'email',
			label: t('form.signup.email'),
		},
		// TODO: 1) handle password visibility
		// 2) style icon https://tailwindui.com/components/application-ui/forms/input-groups
		// https://discord.com/channels/793529058377072650/940340536747896842/1140471543290409020
		{
			$formkit: 'password',
			name: 'password',
			label: t('form.signup.password'),
			help: t('form.signup.password_help'),
			// TODO: https://linear.app/newwwagency/issue/LEA-84/password-input-handle-password-visibility
			// suffixIcon: 'eyeClosed',
			// onSuffixIconClick: handlePasswordVisibility
		},
		{
			$formkit: 'submit',
			label: t('form.signup.submit'),
			inputClass: 'w-full'
		}
	]

	const signupForm = reactive({
		company_name: '',
		first_name: '',
		last_name: '',
		email: '',
		password: ''
	})

	const handleSubmit = async () => {
		try {
			const { data, error } = await supabase.auth.signUp({
				email: signupForm.email,
				password: signupForm.password,
				options: {
					data: {
						first_name: signupForm.first_name,
						last_name: signupForm.last_name,
						// at the moment it's not possible to invite team members. However, it might be possible in the future. For now, we always assign is_company_owner to true.
						is_company_owner: true,
						// company name that is being set in trigger
						set_initial_company_name: signupForm.company_name
					},
					emailRedirectTo: `${useRuntimeConfig().public.BASE_URL}${ROUTES.FIRST_STEP_ROUTE}`
				}
			})
			if (error) throw Error(error.message)

			navigateTo('/welcome/verify-email')
		} catch (error) {
			alert(error.error_description || error.message)
		} finally {

		}
	}

	return { schema: signupSchema, form: signupForm, handleSubmit };
}

export const useLoginForm = () => {
	const supabase = useSupabaseClient<Database>()
	const router = useRouter()
	const { t } = useI18n()
	const loading = ref(false)

	const is_claims_admin = async () => {
		const { data, error } = await supabase
			.rpc('is_claims_admin', {});
		return { data, error };
	}

	const loginSchema: FormKitSchemaDefinition = [
		{
			$formkit: 'text',
			name: 'email',
			label: t('form.signup.email'),
			validation: 'required|email'
		},
		// TODO: 1) handle password visibility
		// 2) style icon https://tailwindui.com/components/application-ui/forms/input-groups
		// https://discord.com/channels/793529058377072650/940340536747896842/1140471543290409020
		{
			$formkit: 'password',
			name: 'password',
			label: t('form.signup.password'),
			classes: {
				outer: '!mb-0'
			},
			validation: 'required|length:8'
			// TODO: https://linear.app/newwwagency/issue/LEA-84/password-input-handle-password-visibility
			// suffixIcon: 'eyeClosed',
			// onSuffixIconClick: handlePasswordVisibility
		},
		{
			$el: 'div',
			attrs: {
				class: 'text-right mb-5 text-sm'
			},
			children: [
				{
					$cmp: 'NuxtLink',
					children: t('form.login.forgot_password'),
					props: {
						to: '/forgot-password'
					}
				}
			]
		},
		{
			$formkit: 'submit',
			label: t('form.login.submit'),
			inputClass: 'w-full'
		}
	]

	const loginForm = reactive({
		email: '',
		password: ''
	})

	const handleSubmit = async () => {
		try {
			loading.value = true
			const { data, error } = await supabase.auth.signInWithPassword({
				email: loginForm.email,
				password: loginForm.password
			})
			if (error) throw error

			const { data: isAdmin } = await is_claims_admin();

			if (isAdmin) {
				return router.push(ROUTES.ADMIN_DASHBOARD)
			}

            router.push(ROUTES.START_PAGE_AFTER_LOGIN)
        } catch (error) {
            console.log(error.error_description || error.message)
            return error.message;
        } finally {
            loading.value = false
        }
    };

	return { schema: loginSchema, form: loginForm, loading: loading, handleSubmit };
}

export const useForgotPasswordForm = () => {
	const supabase = useSupabaseClient<Database>()
	const { t } = useI18n()
	const loading = ref(false)

	const forgotPasswordSchema: FormKitSchemaDefinition = [
		{
			$formkit: 'text',
			name: 'email',
			label: t('form.signup.email'),
		},
		{
			$formkit: 'submit',
			label: t('form.forgot_password.submit'),
			inputClass: 'w-full'
		}
	]

	const forgotPasswordForm = reactive({
		email: '',
	})

	const handleSubmit = async () => {
		try {
			loading.value = true
			const { data, error } = await supabase.auth
				.resetPasswordForEmail(forgotPasswordForm.email, {
					redirectTo: `${useRuntimeConfig().public.BASE_URL}/forgot-password/update-password`
				})

			if (error) throw error

			navigateTo('/forgot-password/link-sent?email=' + forgotPasswordForm.email)

		} catch (error) {
			alert(error.error_description || error.message)
		} finally {
			loading.value = false
		}
	}

	return { schema: forgotPasswordSchema, form: forgotPasswordForm, loading: loading, handleSubmit };
}

export const useUpdatePasswordForm = () => {
	const supabase = useSupabaseClient<Database>()
	const { t } = useI18n()
	const loading = ref(false)

	const updatePasswordSchema: FormKitSchemaDefinition = [
		{
			$formkit: 'password',
			name: 'password',
			label: t('form.forgot_password.password_new'),
		},
		{
			$formkit: 'password',
			name: 'passwordConfirmation',
			label: t('form.forgot_password.password_confirmation'),
		},
		{
			$formkit: 'submit',
			label: t('form.forgot_password.submit'),
			inputClass: 'w-full'
		}
	]

	const updatePasswordForm = reactive({
		password: '',
		passwordConfirmation: ''
	})

	const handleSubmit = async () => {
		if (updatePasswordForm.password !== updatePasswordForm.passwordConfirmation) {
			return alert('Passwords do not match')
		}

		try {
			loading.value = true

			console.log('getting here')
			console.log(updatePasswordForm.password)

			const { data, error } = await supabase.auth.updateUser({ password: updatePasswordForm.password })

			// TODO: fix bug https://linear.app/newwwagency/issue/LEA-119
			console.log('not getting here')

			if (error) throw error

			navigateTo('/forgot-password/success')

		} catch (error) {
			console.log('not getting here')
			alert(error.error_description || error.message)
		} finally {
			console.log('not getting here')
			loading.value = false
		}
	}

	return { schema: updatePasswordSchema, form: updatePasswordForm, loading: loading, handleSubmit };
}

export const useAuthForm = (context: AuthContext) => {
	if (context === 'login') {
		return useLoginForm();
	} else if (context === 'signup') {
		return useSignupForm();
	} else if (context === 'forgot-password') {
		return useForgotPasswordForm();
	} else if (context === 'update-password') {
		return useUpdatePasswordForm()
	}
	else {
		throw new Error(`Unsupported context: ${context}`);
	}
}

