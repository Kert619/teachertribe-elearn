export default defineNuxtPlugin(async (nuxtApp) => {
  const authStore = useAuthStore();
  if (!authStore.user && authStore.token) {
    await authStore.fetchUser();
  }
});
