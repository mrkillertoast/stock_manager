// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: { enabled: true },
	modules: [
		'@nuxtjs/tailwindcss',
		'shadcn-nuxt',
		'@nuxt/icon',
		'@nuxthub/core',
	],
	shadcn: {
		/**
		 * Prefix for all the imported component
		 */
		prefix: '',
		/**
		 * Directory that the component lives in.
		 * @default "./components/ui"
		 */
		componentDir: './components/ui'
	},
	ssr: false,
	runtimeConfig: {
		openAIApiKey: process.env.OPENAI_API_KEY,
		public: {
			appwriteEndpoint: process.env.APPWRITE_ENDPOINT,
			appwriteProjectId: process.env.APPWRITE_PROJECT_ID,
		},
	},
})