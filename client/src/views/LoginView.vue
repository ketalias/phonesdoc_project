<template>
  <b-container class="mt-5">
    <b-row align-h="center">
      <b-col cols="6">
        <b-card title="Admin Login">
          <b-form @submit.prevent="login">
            <b-form-group label="Username" label-for="username">
              <b-form-input
                id="username"
                v-model="username"
                type="text"
                required
              />
            </b-form-group>
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
import { jwtDecode } from "jwt-decode";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await API.post("/api/auth/login", {
          username: this.username,
          password: this.password,
        });

        console.log(this.username, this.password);

        const { token } = response.data;
        const decoded = jwtDecode(token);

        const role = decoded.role;

        console.log(response.data);
        if (!token) throw new Error("Token not returned");

        sessionStorage.setItem("token", token);
        sessionStorage.setItem("role", role);

        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        this.$router.push("/admin");
      } catch (err) {
        console.error("Login error:", err);
        alert("Невірний логін або пароль");
      }
    },
  },
};
</script>
