export default defineNuxtRouteMiddleware((to, from) => {
  const lowerCasePath = to.fullPath.toLowerCase();
  if (lowerCasePath !== to.fullPath) {
    return navigateTo(lowerCasePath, { replace: true, redirectCode: 301 });
  }
});
