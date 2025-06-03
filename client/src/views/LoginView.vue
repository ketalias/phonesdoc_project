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
export default {
  data() {
    return {
      password: "",
    };
  },
  methods: {
    login() {
      if (this.password === "admin123") {
        localStorage.setItem("authToken", "123456");
        this.$router.push({ name: "admin" });
      } else {
        alert("Невірний пароль");
      }
    },
  },
};
</script>
