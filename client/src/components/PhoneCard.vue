<template>
  <div class="card h-100 shadow-sm">
    <img :src="phone.photo_url" class="card-img-top" :alt="phone.fullname" />
    <div class="card-body">
      <h5 class="card-title">{{ phone.fullname }}</h5>
      <p class="card-text">
        <strong>Бренд:</strong> {{ phone.brand }}<br />
        <strong>Рік:</strong> {{ phone.release_year }}<br />
        <strong>Колір:</strong> {{ phone.color }}<br />
        <strong>Bluetooth:</strong> {{ phone.has_bluetooth ? "Так" : "Ні"
        }}<br />
        <strong>ІЧ-порт:</strong> {{ phone.has_infrared ? "Так" : "Ні" }}
      </p>
    </div>
    <div class="card-footer d-flex justify-content-between align-items-center">
      <span class="text-dark fw-bold">{{ phone.price }} $</span>
      <slot name="actions" />
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
.card-img-top {
  object-fit: cover;
  height: auto;
}
</style>
