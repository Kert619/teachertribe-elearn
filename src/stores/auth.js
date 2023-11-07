export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const roles = ref([]);
  const permissions = ref([]);
  const levels_passed = ref([]);

  async function login(payload) {
    const login = await useApiFetch("/login", {
      method: "POST",
      body: payload,
    });

    if (login.status.value === "success") {
      setUser(login.data.value);
      setTokenCookie(login.data.value.token);
    }

    return login;
  }

  async function logout() {
    await useApiFetch("/logout", { method: "POST" });
    reset();
  }

  function setUser(data) {
    user.value = data.user;
    roles.value = data.roles;
    permissions.value = data.permissions;
    levels_passed.value = data.levels_passed;
  }

  function setTokenCookie(token) {
    const tokenCookie = useCookie("token", { maxAge: 60 * 60 * 24 * 7 });
    tokenCookie.value = token;
  }

  function removeTokenCookie() {
    const token = useCookie("token");
    token.value = null;
  }

  const isStudent = computed(() => roles.value.includes("student"));

  function reset() {
    user.value = null;
    roles.value = [];
    permissions.value = [];
    levels_passed.value = [];
    removeTokenCookie();
  }

  return {
    user,
    roles,
    permissions,
    levels_passed,
    login,
    setUser,
    logout,
    isStudent,
    reset,
  };
});
