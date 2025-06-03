<template>
  <div class="card phone-card p-3 shadow-sm border-0 d-flex flex-column h-100">
    <div class="image-wrapper d-flex justify-content-center align-items-center">
      <img
        :src="phone.photo_url"
        class="card-img-top phone-image"
        :alt="phone.fullname"
      />
    </div>
    <div
      class="card-body d-flex flex-column align-items-center text-center mt-auto"
    >
      <h5 class="card-title mb-2 fs-5">{{ phone.fullname }}</h5>
      <p class="fw-bold fs-4">${{ phone.price }}</p>
      <router-link
        :to="{ name: 'phoneinfo', params: { id: phone.id } }"
        class="btn btn-dark btn-sm w-100 p-3 mt-auto"
      >
        Придбати
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "PhoneCard",
  props: {
    phone: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.phone-card {
  background-color: #e5e5e5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.image-wrapper {
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-img-top {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  text-align: center;
}

.btn {
  background-color: #252424 !important;
}
</style>
