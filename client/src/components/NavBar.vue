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
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup></script>

<style scoped>
.navbar {
  z-index: 1000;
  background-color: white !important;
}

li {
  padding: 0 25px;
}
</style>
