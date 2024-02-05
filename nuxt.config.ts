// import { axios } from 'axios';
import { START_PAGE_AFTER_LOGIN } from "./constants/routes/";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: [
		"@nuxtjs/supabase",
		"@formkit/nuxt",
		"@nuxtjs/tailwindcss",
		"@nuxtjs/i18n",
		['@pinia/nuxt', {
			autoImport: ['defineStore', 'acceptHMRUpdate']
		}],
		"nuxt-svgo",
		"lodash",
		// "@nuxtjs/axios",
		// "@nuxtjs/auth-next",
		// "@nuxtjs/http",
	],
	pinia: {
		storesDirs: ['./stores/**'],
	},
	runtimeConfig: {
		stripeSecretKey: process.env.STRIPE_SECRET_KEY,
		facebookId: process.env.FACEBOOK_ID,
		facebookSecret: process.env.FACEBOOK_SECRET,
		facebookAdId: process.env.FACEBOOK_AD_ACCOUNT_ID,
		supabaseUrl: process.env.SUPABASE_URL,
		supabaseKey: process.env.SUPABASE_KEY,
		public: {
			BASE_URL: process.env.BASE_URL,
			APP_NAME: process.env.APP_NAME,
			stripePublicKey: process.env.STRIPE_PUBLIC_KEY,
			FORMKIT_PRO_KEY: process.env.FORMKIT_PRO_KEY,
		},
	},
	i18n: {
		locales: ['de', 'en'],
		defaultLocale: 'de',
		detectBrowserLanguage: {
		  useCookie: true,
		  cookieKey: 'i18n_redirected',
		  redirectOn: 'root',
		  alwaysRedirect: true,
		  fallbackLocale: 'en'
		},
		strategy: 'no_prefix',
	},
	css: ["~/assets/css/main.css"],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	svgo: {
		autoImportPath: "assets/icons/",
		defaultImport: "component",
	},
	routeRules: {
		"/portal": { redirect: START_PAGE_AFTER_LOGIN },
	},
});
