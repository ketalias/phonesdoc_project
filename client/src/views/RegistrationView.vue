<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow">
          <div class="card-body">
            <h3 class="card-title mb-4 text-center">Реєстрація</h3>

            <form @submit.prevent="handleRegister">
              <div class="mb-3">
                <label for="username" class="form-label"
                  >Ім'я користувача</label
                >
                <input
                  type="text"
                  id="username"
                  v-model="form.username"
                  class="form-control"
                  required
                />
              </div>

              <div class="mb-3">
                <label for="password" class="form-label">Пароль</label>
                <input
                  type="password"
                  id="password"
                  v-model="form.password"
                  class="form-control"
                  required
                />
              </div>

              <button
                type="submit"
                class="btn btn-dark w-100"
                :disabled="loading"
              >
                {{ loading ? "Реєстрація..." : "Зареєструватися" }}
              </button>

              <div v-if="error" class="alert alert-danger mt-3">
                {{ error }}
              </div>

              <div v-if="success" class="alert alert-success mt-3">
                Реєстрація успішна!
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import API from "@/api";

const form = ref({
  username: "",
  password: "",
  role: "user",
});

const loading = ref(false);
const error = ref("");
const success = ref(false);

const handleRegister = async () => {
  error.value = "";
  success.value = false;
  loading.value = true;

  try {
    const response = await API.post("/api/auth/register", form.value);

    if (response.data.token) {
      sessionStorage.setItem("token", response.data.token);
    }

    success.value = true;
    form.value = { username: "", password: "", role: "user" };
  } catch (err) {
    error.value = err.response?.data?.message || "Помилка при реєстрації";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.card {
  border-radius: 1rem;
}
</style>
