<template>
  <b-container class="mt-5">
    <b-row align-h="center">
      <b-col cols="6">
        <b-card title="Admin Login">
          <b-form @submit.prevent="login">
            <b-form-group label="Password" label-for="password">
              <b-form-input
                id="password"
                v-model="password"
                type="password"
                required
              />
            </b-form-group>
            <b-button type="submit" variant="primary">Login</b-button>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import API from "../api";

export default {
  data() {
    return {
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const res = await API.post("/api/auth/login", {
          password: this.password,
        });
        const data = res.data;

        if (data.token) {
          localStorage.setItem("authToken", data.token);
          this.$router.push({ name: "admin" });
        } else {
          alert("Невірний пароль");
        }
      } catch (err) {
        console.error("Помилка під час входу:", err);
        alert(err.response?.data?.message || "Помилка під час входу");
      }
    },
  },
};
</script>
