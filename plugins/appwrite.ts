import { Client, Account, Databases } from 'appwrite';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(async (nuxtApp) => {
	const config = useRuntimeConfig();

	// Initialize Appwrite client
	const client = new Client()
		.setEndpoint(config.public.appwriteEndpoint)
		.setProject(config.public.appwriteProjectId);

	const account = new Account(client);
	const databases = new Databases(client);

	// Make client and account available throughout the app
	return {
		provide: {
			appwrite: {
				client,
				account,
				databases
			}
		}
	};
});