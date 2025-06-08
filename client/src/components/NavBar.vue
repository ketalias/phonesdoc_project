<template>
  <nav
    class="navbar navbar-expand-lg navbar-light p-3 position-fixed top-0 w-100"
  >
    <div class="container-fluid">
      <router-link
        to="/"
        class="navbar-brand fw-bolder d-flex align-items-center gap-0"
      >
        <span>PixiStore</span>
        <img src="../assets/navlogo.jpg" alt="Logo" style="height: 2em" />
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link fw-bold" to="/">Головна</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link fw-bold" to="/catalog"
              >Каталог</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link fw-bold" to="/cart">Кошик</router-link>
          </li>
          <li v-if="!auth.isAuthenticated" class="nav-item">
            <router-link class="nav-link fw-bold" to="/auth">Вхід</router-link>
          </li>
          <li v-else class="nav-item">
            <button
              class="btn btn-link nav-link fw-bold"
              @click="logout"
              style="cursor: pointer"
            >
              Вийти
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import API from "@/api";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

function logout() {
  auth.clearAuth();
  delete API.defaults.headers.common["Authorization"];
  router.push("/auth");
}
</script>

<style scoped>
.navbar {
  z-index: 1000;
  background-color: white !important;
}

li {
  padding: 0 25px;
}
</style>
