export const useApiFetch = (request, options) => {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (authStore.token) {
    headers["Authorization"] = `Bearer ${authStore.token}`;
  }

  return useFetch(request, {
    baseURL: config.public.apiBase,
    method: "GET",
    watch: false,
    deep: false,
    transform: (_data) => _data.data,
    ...options,
    headers,
    onResponseError({ request, response, options }) {
      if (response.status === 401) {
        const authStore = useAuthStore();
        authStore.reset();
      }
    },
  });
};
