<template>
  <div
    class="card h-100 shadow-sm p-3 border-0"
    style="background-color: #e3e4e6"
  >
    <img :src="phone.photo_url" class="card-img-top" :alt="phone.fullname" />
    <div class="card-body">
      <h5 class="card-title">{{ phone.fullname }}</h5>
      <p class="card-text"></p>
    </div>
    <div
      class="card-footer d-flex justify-content-between align-items-center border-0"
      style="background-color: #e3e4e6"
    >
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
