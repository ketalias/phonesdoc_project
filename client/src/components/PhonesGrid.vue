<template>
  <div class="items col-12 col-md-9 col-lg-9">
    <div v-if="phones.length === 0" class="text-muted">Нічого не знайдено</div>

    <div class="row g-4">
      <div
        v-for="phone in phones"
        :key="phone.fullname"
        class="col-12 col-sm-6 col-md-4 col-lg-3"
      >
        <phone-card :phone="phone">
          <template #actions>
            <router-link
              :to="{ name: 'phoneinfo', params: { id: phone.id } }"
              class="btn btn-dark btn-sm w-100 p-3"
            >
              Перейти
            </router-link>
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
