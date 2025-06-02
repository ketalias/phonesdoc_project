<template>
  <div class="container">
    <div v-if="phone" class="mb-3 card">
      <div class="card-body row justify-content-center">
        <div class="photo col-md-6">
          <img
            :src="phone.photo_url"
            :alt="phone.fullname"
            class="card-img-top"
          />
        </div>
        <div class="col-md-6 text-start fs-5">
          <h5 class="card-title fs-1 fw-bolder">{{ phone.fullname }}</h5>
          <p class="card-price fs-3 fw-bold">${{ phone.price }}</p>
          <p class="card-color">Colors: {{ phone.color }}</p>
          <p class="card-year">Year - {{ phone.release_year }}</p>
          <p class="card-bluetooth">
            Bluetooth:
            <i
              v-if="phone.has_bluetooth"
              class="bi bi-check-circle-fill text-success"
            ></i>
            <i v-else class="bi bi-x-circle-fill text-danger"></i>
          </p>
          <p class="card-infrared">
            Infrared:
            <i
              v-if="phone.has_infrared"
              class="bi bi-check-circle-fill text-success"
            ></i>
            <i v-else class="bi bi-x-circle-fill text-danger"></i>
          </p>
          <div class="d-flex flex-column flex-md-row gap-3 mt-4">
            <button class="btn btn-dark btn-lg w-100">Get Started</button>
            <button class="btn btn-outline-dark btn-lg w-100">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center mt-5">
      <p>Loading phone information...</p>
    </div>
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

<style></style>
