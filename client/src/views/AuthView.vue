<template>
  <div>
    <b-container
      class="auth-container mt-5 d-flex align-items-center justify-content-center"
      fluid
      style="
        min-height: 70vh;
        background-size: cover;
        background-position: center;
      "
    >
      <b-row class="w-100 justify-content-center">
        <b-col cols="12" md="8" lg="6" xl="5">
          <b-card :title="isLogin ? 'Вхід' : 'Реєстрація'">
            <b-form @submit.prevent="handleSubmit">
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

              <b-form-group
                v-if="!isLogin"
                label="Підтвердження пароля"
                label-for="confirmPassword"
              >
                <b-form-input
                  id="confirmPassword"
                  type="password"
                  v-model="confirmPassword"
                  required
                />
              </b-form-group>

              <b-button
                type="submit"
                variant="dark"
                class="w-100"
                :disabled="loading"
              >
                {{ isLogin ? "Увійти" : "Зареєструватися" }}
              </b-button>

              <b-alert
                v-model="showAlert"
                :variant="alertVariant"
                dismissible
                class="mt-3"
                @dismissed="showAlert = false"
                fade
              >
                {{ alertMessage }}
              </b-alert>
            </b-form>

            <div class="mt-3 text-center">
              <a
                href="#"
                @click.prevent="toggleMode"
                class="text-dark text-decoration-underline"
              >
                {{
                  isLogin
                    ? "Ще не маєте акаунту? Зареєструйтесь"
                    : "Вже маєте акаунт? Увійдіть"
                }}
              </a>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <footer-comp></footer-comp>
  </div>
</template>

<script>
import API from "@/api";
import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "@/stores/auth";
import FooterComp from "@/components/FooterComp.vue";

export default {
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: "",
      alertMessage: "",
      alertVariant: "",
      showAlert: false,
      loading: false,
      isLogin: true,
    };
  },
  components: {
    FooterComp,
  },
  methods: {
    toggleMode() {
      this.isLogin = !this.isLogin;
      this.clearForm();
    },
    clearForm() {
      this.username = "";
      this.password = "";
      this.confirmPassword = "";
      this.alertMessage = "";
      this.showAlert = false;
      this.loading = false;
    },
    setAlert(message, variant = "info") {
      this.alertMessage = message;
      this.alertVariant = variant;
      this.showAlert = true;

      setTimeout(() => {
        this.showAlert = false;
      }, 4000);
    },
    async handleSubmit() {
      this.showAlert = false;
      this.loading = true;

      if (!this.isLogin && this.password !== this.confirmPassword) {
        this.setAlert("Паролі не співпадають", "danger");
        this.loading = false;
        return;
      }

      try {
        const endpoint = this.isLogin
          ? "/api/auth/login"
          : "/api/auth/register";

        const response = await API.post(endpoint, {
          username: this.username,
          password: this.password,
        });

        console.log("Відповідь сервера:", response.data);

        const token = response.data.token;
        const decoded = jwtDecode(token);
        const role = decoded.role;

        const auth = useAuthStore();
        auth.setAuth(token, role);
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        this.setAlert(
          this.isLogin ? "Вхід успішний!" : "Реєстрація успішна!",
          "success"
        );

        setTimeout(() => {
          if (role === "admin") {
            this.$router.push("/admin");
          } else {
            this.$router.push("/catalog");
          }
        }, 1500);
      } catch (e) {
        this.setAlert(
          this.isLogin ? "Невірний логін або пароль" : "Помилка при реєстрації",
          "danger"
        );
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.auth-container {
  background-image: url(../assets/auth-bg.png);
}
</style>
