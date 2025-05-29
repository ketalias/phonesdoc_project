<template>
  <div class="container">
    <h1 class="mb-3">Інформація про телефон</h1>
    <div v-if="phone" class="card mb-3">
      <div class="card-body">
        <h5 class="card-title">{{ phone.fullname }}</h5>
        <p class="card-text">Ціна: {{ phone.price }} грн</p>
      </div>
    </div>
    <router-link to="/catalog" class="btn btn-primary"
      >Повернутися до списку телефонів</router-link
    >
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
export default {
  name: "PhoneInfoView",
  setup() {
    const phone = ref(null);
    const route = useRoute();

    onMounted(async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/phones/${route.params.id}`
        );
        phone.value = response.data;
      } catch (error) {
        console.error("Error fetching phone data:", error);
      }
    });

    return { phone };
  },
};
</script>
