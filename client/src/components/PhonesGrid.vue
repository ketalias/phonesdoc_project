<template>
  <div class="items col-12">
    <div v-if="loading" class="py-5 text-center text-muted">
      <div class="spinner-border text-dark" role="status">
        <span class="visually-hidden">Завантаження...</span>
      </div>
      <p class="mt-3">Завантаження телефонів...</p>
    </div>

    <div v-else-if="phones.length === 0" class="py-5 text-center text-muted">
      <img src="../assets/nofind.jpg" alt="" style="height: 60vh" />
      <h1>Нічого не знайдено</h1>
    </div>

    <div v-else class="row g-4">
      <div
        v-for="phone in phones"
        :key="phone.fullname"
        class="col-12 col-sm-6 col-md-4 col-lg-3"
      >
        <phone-card :phone="phone" />
      </div>
    </div>
  </div>
</template>

<script>
import PhoneCard from "./PhoneCard.vue";

export default {
  name: "PhonesGrid",
  components: {
    PhoneCard,
  },
  props: {
    phones: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
