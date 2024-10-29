import { ref } from 'vue';
import type { Models } from 'appwrite';

export const useAppwriteAuth = () => {
	const { $appwrite } = useNuxtApp();
	const user = ref<Models.User<Models.Preferences> | null>(null);
	const loading = ref(true);
	const error = ref<Error | null>(null);

	// Check current session
	const checkSession = async () => {
		try {
			loading.value = true;
			user.value = await $appwrite.account.get();
		} catch (err) {
			error.value = err as Error;
			user.value = null;
		} finally {
			loading.value = false;
		}
	};

	// Login with email
	const login = async (email: string, password: string) => {
		try {
			loading.value = true;
			error.value = null;

			const session = await $appwrite.account.createEmailPasswordSession(email, password);
			await checkSession();

			return session;
		} catch (err) {
			error.value = err as Error;
			throw err;
		} finally {
			loading.value = false;
		}
	};

	// Logout
	const logout = async () => {
		try {
			loading.value = true;
			error.value = null;

			await $appwrite.account.deleteSession('current');
			user.value = null;
		} catch (err) {
			error.value = err as Error;
			throw err;
		} finally {
			loading.value = false;
		}
	};

	// Register new user
	const register = async (email: string, password: string, name?: string) => {
		try {
			loading.value = true;
			error.value = null;

			const response = await $appwrite.account.create('unique()', email, password, name);
			await login(email, password);

			return response;
		} catch (err) {
			error.value = err as Error;
			throw err;
		} finally {
			loading.value = false;
		}
	};

	// Initialize auth state
	onMounted(() => {
		checkSession();
	});

	return {
		user,
		loading,
		error,
		login,
		logout,
		register,
		checkSession
	};
};
