<template>
  <div class="card h-100 shadow-sm p-3 border-0 phone-card">
    <img
      :src="phone.photo_url"
      class="card-img-top phone-image mb-2"
      :alt="phone.fullname"
    />
    <div class="card-body d-flex flex-column">
      <h5 class="card-title mb-2">{{ phone.fullname }}</h5>
      <p><strong>Ціна:</strong> ${{ phone.price }}</p>
      <router-link
        :to="{ name: 'phoneinfo', params: { id: phone.id } }"
        class="btn btn-dark btn-sm w-100 p-3"
      >
        Перейти
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
* {
  background-color: white !important;
}
.btn {
  background-color: #252424 !important;
}
.card-img-top {
  object-fit: contain;
  height: auto;
  max-height: 300px;
}
</style>
