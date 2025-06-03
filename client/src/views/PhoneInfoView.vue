<template>
  <div>
    <div class="container">
      <div v-if="phone" class="mb-3 card border-0">
        <div class="card-body row justify-content-around border-0">
          <div class="photo col-4">
            <img
              :src="phone.photo_url"
              :alt="phone.fullname"
              class="card-img-top"
            />
          </div>
          <div class="col-md-6 text-start fs-5 py-4">
            <h5 class="card-title fs-1 fw-bolder">
              {{ phone.fullname }} {{ phone.release_year }}
            </h5>

            <div class="d-flex gap-3 align-items-center mt-3">
              <p class="card-price fs-3 fw-bold">${{ phone.price }}</p>
              <p
                class="card-price fs-4 text-decoration-line-through text-muted"
              >
                ${{ phone.old_price }}
              </p>
            </div>

            <div class="card-color d-flex align-items-center gap-2 mt-3">
              <span class="fw-bold">Select Color:</span>
              <div
                v-for="(color, index) in normalizedColors"
                :key="index"
                class="color-circle"
                :style="{
                  backgroundColor: color,
                  border:
                    color === selectedColor
                      ? '2px solid black'
                      : '1px solid #ccc',
                  cursor: 'pointer',
                }"
                @click="selectedColor = color"
              ></div>
            </div>

            <div class="memory d-flex flex-wrap gap-2 mt-3">
              <p
                v-for="option in memoryOptions"
                :key="option"
                class="memory-card border p-3 rounded-3"
                :class="{
                  'border-dark': selectedMemory === option,
                  'border-secondary': selectedMemory !== option,
                }"
                @click="selectedMemory = option"
                style="cursor: pointer"
              >
                {{ option }}
              </p>
            </div>

            <div class="characteristics d-flex gap-2 mt-3">
              <p class="bg-dark text-white py-3 px-5 rounded-3">
                {{ phone.screen_size }}
              </p>
              <p class="bg-dark text-white py-3 px-5 rounded-3">
                {{ phone.cpu }}
              </p>
              <p class="bg-dark text-white py-3 px-5 rounded-3">
                {{ phone.battery_capacity }}
              </p>
            </div>

            <div class="d-flex gap-3 mt-2">
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
            </div>

            <p>{{ phone.description }}</p>

            <div class="d-flex flex-column flex-md-row gap-3 mt-4">
              <button
                class="btn btn-dark btn-lg w-100"
                :disabled="!selectedColor || !selectedMemory"
                @click="addToCart"
              >
                Додати в кошик
              </button>
              <button class="btn btn-outline-dark btn-lg w-100">
                <router-link
                  to="/phones"
                  class="text-decoration-none text-dark"
                >
                  Назад в каталог
                </router-link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center mt-5">
        <p>Loading phone information...</p>
      </div>
    </div>
    <footer>
      <footer-comp />
    </footer>
  </div>
</template>

<script>
import FooterComp from "../components/FooterComp.vue";
import API from "../api"; // Шлях може змінюватися залежно від структури

export default {
  components: { FooterComp },
  name: "PhoneInfoView",
  data() {
    return {
      phone: null,
      selectedColor: null,
      selectedMemory: null,
      memoryOptions: ["128 GB", "256 GB", "512 GB", "1 TB"],
    };
  },
  computed: {
    normalizedColors() {
      if (!this.phone || !Array.isArray(this.phone.colors)) return [];
      return this.phone.colors.map((c) => c.trim().toLowerCase());
    },
  },
  methods: {
    async fetchPhone() {
      try {
        const response = await API.get(`/api/phones/${this.$route.params.id}`);
        this.phone = response.data;
      } catch (error) {
        console.error("Помилка при завантаженні даних телефону:", error);
      }
    },
    addToCart() {
      if (!this.selectedColor || !this.selectedMemory) {
        alert("Будь ласка, виберіть колір та памʼять");
        return;
      }

      const item = {
        id: this.phone.id,
        name: this.phone.fullname,
        color: this.selectedColor,
        memory: this.selectedMemory,
        price: this.phone.price,
        photo: this.phone.photo_url,
        quantity: 1,
      };

      const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

      const duplicate = existingCart.find(
        (p) =>
          p.id === item.id && p.color === item.color && p.memory === item.memory
      );

      if (duplicate) {
        duplicate.quantity += 1;
      } else {
        existingCart.push(item);
      }

      localStorage.setItem("cart", JSON.stringify(existingCart));
      alert(`Додано до кошика: ${item.name}, ${item.memory}, ${item.color}`);
    },
  },
  created() {
    this.fetchPhone();
  },
};
</script>

<style>
.color-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  transition: border 0.2s ease;
}
.memory-card {
  user-select: none;
  transition: border 0.2s ease;
}
</style>
