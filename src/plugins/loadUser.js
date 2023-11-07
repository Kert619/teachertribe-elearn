export default defineNuxtPlugin(async (nuxtApp) => {
  const authStore = useAuthStore();
  const token = useCookie("token");

  if (!authStore.user && token.value) {
    const { data: user, error } = await useApiFetch("/me");

    if (error.value) {
      authStore.reset();
      return navigateTo("/", { replace: true });
    }

    authStore.setUser(user.value);
  }
});
