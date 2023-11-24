export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  const allowedRoles = (to.meta.allowedRoles as string[]) || [];

  if (!authStore.user?.roles.some((value) => allowedRoles.includes(value))) {
    throw showError({
      statusCode: 403,
      statusMessage: "Sorry, you are not allowed to access this page.",
      fatal: true,
    });
  }
});
