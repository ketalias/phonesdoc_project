<template>
  <div class="items col-md-6">
    <div v-if="phones.length === 0" class="text-muted">Нічого не знайдено</div>
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div v-for="phone in phones" :key="phone.fullname" class="col">
        <phone-card :phone="phone">
          <template #actions>
            <button class="btn btn-dark btn-sm w-100 p-3">Перейти</button>
          </template>
        </phone-card>
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
  },
};
</script>

<style scoped>
.mb-3 {
  margin-bottom: 1rem !important;
}
</style>
