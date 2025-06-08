import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: sessionStorage.getItem("token") || null,
    role: sessionStorage.getItem("role") || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    setAuth(token, role) {
      this.token = token;
      this.role = role;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("role", role);
    },
    clearAuth() {
      this.token = null;
      this.role = null;
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("role");
    },
  },
});
