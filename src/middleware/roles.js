export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  if (!authStore.roles.some((value) => to.meta.allowedRoles.includes(value))) {
    throw showError({
      statusCode: 403,
      statusMessage: "Sorry, you are not allowed to access this page.",
      fatal: true,
    });
  }
});
