import type { User, loginCredentials } from "@/types/auth";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const token = useCookie("token", { maxAge: 60 * 60 * 24 * 7 });

  async function fetchUser() {
    const { data } = await useAPI<User>("/me", {
      transform: (data: any) => ({
        id: data.data.user.id as string,
        name: data.data.user.name as string,
        email: data.data.user.email as string,
        roles: data.data.roles as string[],
        permissions: data.data.permissions as string[],
      }),
    });

    if (data.value) {
      setUser(data.value);
    }
  }

  async function login(credentials: loginCredentials) {
    const login = await useAPI<{ token: string }>("/login", {
      method: "POST",
      body: credentials,
      transform: (data: any) => {
        return { token: data.data.token as string };
      },
    });

    if (login.data.value) {
      setToken(login.data.value.token);
      await fetchUser();
    }

    return login;
  }

  async function logout() {
    await useAPI("/logout", { method: "POST" });
    reset();
  }

  function setUser(data: User) {
    user.value = data;
  }

  function setToken(val: string) {
    token.value = val;
  }

  function removeToken() {
    token.value = null;
  }

  const isStudent = computed(() => {
    if (user.value) {
      return user.value.roles.includes("student");
    }

    return false;
  });

  function reset() {
    user.value = null;
    token.value = null;
    removeToken();
    window.location.reload();
  }

  return {
    user,
    token,
    fetchUser,
    login,
    setUser,
    logout,
    isStudent,
    reset,
  };
});
