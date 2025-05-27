<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-light p-3 position-fixed top-0 w-100"
  >
    <div class="container-fluid">
      <router-link class="navbar-brand fw-bolder" to="/">PhoneDoc</router-link>

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
            <router-link class="nav-link fw-bold" to="/about"
              >Про нас</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link fw-bold" to="/contact"
              >Контакти</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup></script>

<style scoped>
.navbar {
  background-color: #f8f9fa !important;
  z-index: 1000;
}
</style>
