import type { UseFetchOptions } from "nuxt/app";

export function useAPI<T>(request: string, options: UseFetchOptions<T> = {}) {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();

  const headers: {
    Accept: string;
    "Content-Type": string;
    Authorization?: string;
  } = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (authStore.token) {
    headers["Authorization"] = `Bearer ${authStore.token}`;
  }

  return useFetch(request, {
    baseURL: config.public.apiBase,
    method: "get",
    watch: false,
    ...options,
    headers,
    onResponseError({ response }) {
      if (response.status === 401) {
        authStore.reset();
      }
    },
  });
}
