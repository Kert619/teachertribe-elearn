export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const roles = ref([]);
  const permissions = ref([]);
  const levels_passed = ref([]);
  const token = useCookie("token", { maxAge: 60 * 60 * 24 * 7 });

  async function fetchUser() {
    const { data, error } = await useApiFetch("/me");
    if (!error.value) {
      setUser(data.value);
    }
  }

  async function login(payload) {
    const login = await useApiFetch("/login", {
      method: "POST",
      body: payload,
    });

    if (login.data.value) {
      setUser(login.data.value);
      setToken(login.data.value.token);
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

  function setToken(val) {
    token.value = val;
  }

  function removeToken() {
    token.value = null;
  }

  const isStudent = computed(() => roles.value.includes("student"));

  function reset() {
    user.value = null;
    roles.value = [];
    permissions.value = [];
    levels_passed.value = [];
    token.value = null;
    removeToken();
  }

  return {
    user,
    roles,
    permissions,
    levels_passed,
    token,
    fetchUser,
    login,
    setUser,
    logout,
    isStudent,
    reset,
  };
});
