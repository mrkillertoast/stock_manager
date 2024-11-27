import { Client, Account, Databases, Functions } from 'appwrite';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(async (nuxtApp) => {
	const config = useRuntimeConfig();

	// Initialize Appwrite client
	const client = new Client()
		.setEndpoint(config.public.appwriteEndpoint)
		.setProject(config.public.appwriteProjectId);

	const account = new Account(client);
	const databases = new Databases(client);
	const functions = new Functions(client);

	// Make client and account available throughout the app
	return {
		provide: {
			appwrite: {
				client,
				account,
				databases,
				functions
			}
		}
	};
});