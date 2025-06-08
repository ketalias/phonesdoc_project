<template>
  <b-container class="mt-5">
    <b-row align-h="center">
      <b-col cols="6">
        <b-card title="Вхід">
          <b-form @submit.prevent="login">
            <b-form-group label="Імʼя користувача" label-for="username">
              <b-form-input id="username" v-model="username" required />
            </b-form-group>

            <b-form-group label="Пароль" label-for="password">
              <b-form-input
                id="password"
                type="password"
                v-model="password"
                required
              />
            </b-form-group>

            <button
              type="submit"
              class="btn btn-dark w-100"
              :disabled="loading"
            >
              Увійти
            </button>

            <b-alert variant="danger" v-if="error" class="mt-3" dismissible>{{
              error
            }}</b-alert>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import API from "../api";
import { jwtDecode } from "jwt-decode";

export default {
  data() {
    return {
      username: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async login() {
      this.error = "";
      try {
        const response = await API.post("/api/auth/login", {
          username: this.username,
          password: this.password,
        });

        const { token } = response.data;
        const decoded = jwtDecode(token);
        const role = decoded.role;

        sessionStorage.setItem("token", token);
        sessionStorage.setItem("role", role);
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        if (role === "admin") {
          this.$router.push("/admin");
        } else if (role === "user") {
          this.$router.push("/catalog");
        } else {
          this.error = "Невідома роль";
        }
      } catch (err) {
        this.error = "Невірний логін або пароль";
      }
    },
  },
};
</script>
