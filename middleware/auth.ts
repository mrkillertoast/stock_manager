export default defineNuxtRouteMiddleware(async (to) => {
	const { user, loading, checkSession } = useAppwriteAuth();

	// Check session on first load
	if (loading.value) {
		await checkSession();
	}

	// If route requires auth and user is not logged in
	if (to.meta.requiresAuth && !user.value) {
		return navigateTo('/login');
	}

	// If user is logged in and trying to access auth pages (login/register)
	if (user.value && to.meta.authPage) {
		return navigateTo('/stock-overview');
	}
});
