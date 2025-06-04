<template>
  <div class="container text-center py-5" style="min-height: 60vh">
    <img src="../assets/404photo.jpg" alt="" style="height: 50vh" />
    <h1 class="display-2 fw-bold">404</h1>
    <p class="display-6 text-muted mb-4">Сторінку не знайдено</p>
    <router-link to="/" class="btn btn-dark">На головну</router-link>
  </div>
</template>

<script>
export default {
  name: "NotFoundView",
};
</script>
