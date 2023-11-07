import { useNuxtApp } from "nuxt/app";

export const useApiFetch = (request, options) => {
  const config = useRuntimeConfig();
  const token = useCookie("token");
  const nuxtApp = useNuxtApp();

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (token.value) {
    headers["Authorization"] = `Bearer ${token.value}`;
  }

  return useFetch(request, {
    baseURL: config.public.apiBase,
    method: "GET",
    watch: false,
    transform: (_data) => _data.data,
    ...options,
    headers,
    onResponseError({ request, response, options }) {
      if (response.status === 401) {
        const authStore = useAuthStore();
        authStore.reset();
        return navigateTo("/", { replace: true });
      }
    },
  });
};
