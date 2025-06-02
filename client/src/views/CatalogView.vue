<template>
  <div>
    <div class="mt-3 wrapper">
      <div class="catalog-view row justify-content-center">
        <div class="filter col-md-3">
          <input
            type="text"
            class="form-control mb-3"
            placeholder="Пошук..."
            v-model="searchText"
            @input="submitFilters"
          />
          <filter-dropdown
            title="Бренд"
            :options="brandOptions"
            v-model:selected="selectedBrands"
            filter-key="brand"
            @change="submitFilters"
          />
          <filter-dropdown
            title="Ціна"
            :options="priceRanges"
            v-model:selected="selectedPriceRanges"
            filter-key="price"
            :show-search="false"
            @change="submitFilters"
            class="mt-2"
          />
          <filter-dropdown
            title="Рік"
            :options="yearRanges"
            v-model:selected="selectedYearRanges"
            filter-key="year"
            :show-search="false"
            @change="submitFilters"
            class="mt-2"
          />
          <filter-dropdown
            title="Колір"
            :options="colorRanges"
            v-model:selected="selectedColorRanges"
            filter-key="color"
            :show-search="false"
            @change="submitFilters"
            class="mt-2"
          />
          <filter-dropdown
            title="ІЧ порт"
            :options="portRanges"
            v-model:selected="selectedPortRanges"
            filter-key="port"
            :show-search="false"
            @change="submitFilters"
            class="mt-2"
          />
          <filter-dropdown
            title="Блютуз"
            :options="bluetoothRanges"
            v-model:selected="selectedBluetoothRanges"
            filter-key="bluetooth"
            :show-search="false"
            @change="submitFilters"
            class="mt-2"
          />
        </div>

        <phones-grid :phones="filteredPhones" />
      </div>
    </div>
    <div class="pagination mt-4 d-flex justify-content-center">
      <button
        class="btn btn-outline-dark mx-1"
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
      >
        <i class="bi bi-chevron-left"></i>
      </button>

      <button
        v-for="page in totalPages"
        :key="page"
        @click="changePage(page)"
        :class="[
          'btn',
          page === currentPage ? 'btn-dark' : 'btn-outline-dark',
          'mx-1',
        ]"
      >
        {{ page }}
      </button>

      <button
        class="btn btn-outline-dark mx-1"
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
      >
        <i class="bi bi-chevron-right"></i>
      </button>
    </div>

    <footer><footer-comp /></footer>
  </div>
</template>

<script>
import axios from "axios";
import FilterDropdown from "../components/FilterDropdown.vue";
import PhonesGrid from "../components/PhonesGrid.vue";
import FooterComp from "../components/FooterComp.vue";

export default {
  name: "CatalogView",
  components: {
    FilterDropdown,
    PhonesGrid,
    FooterComp,
  },
  data() {
    return {
      currentPage: 1,
      totalPages: 1,
      limit: 12,
      phones: [],
      searchText: "",
      selectedBrands: [],
      selectedPriceRanges: [],
      selectedYearRanges: [],
      selectedColorRanges: [],
      selectedPortRanges: [],
      selectedBluetoothRanges: [],
      priceRanges: [
        { label: "До 15,000 грн", value: "0-15000", min: 0, max: 15000 },
        {
          label: "15,000 - 30,000 грн",
          value: "15000-30000",
          min: 15000,
          max: 30000,
        },
        {
          label: "Понад 30,000 грн",
          value: "30000+",
          min: 30000,
          max: Infinity,
        },
      ],
      yearRanges: [
        { label: "До 2018", value: "0-2018", min: 0, max: 2018 },
        { label: "2019 - 2021", value: "2019-2021", min: 2019, max: 2021 },
        { label: "2022+", value: "2022+", min: 2022, max: Infinity },
      ],
      portRanges: [
        { label: "Є ІЧ-порт", value: "true", hasPort: true },
        { label: "Немає ІЧ-порту", value: "false", hasPort: false },
      ],
      bluetoothRanges: [
        { label: "Є Bluetooth", value: "true", hasBluetooth: true },
        { label: "Немає Bluetooth", value: "false", hasBluetooth: false },
      ],
    };
  },
  computed: {
    brandOptions() {
      const brands = [...new Set(this.phones.map((p) => p.brand))];
      return brands.map((brand) => ({
        label: brand,
        value: brand,
      }));
    },
    colorRanges() {
      const colors = [...new Set(this.phones.map((p) => p.color))];
      return colors.map((color) => ({
        label: color,
        value: color,
      }));
    },
    filteredPhones() {
      return this.phones.filter((phone) => {
        const searchLower = this.searchText.toLowerCase();
        const searchMatch =
          this.searchText === "" ||
          phone.fullname.toLowerCase().includes(searchLower);
        const brandMatch =
          this.selectedBrands.length === 0 ||
          this.selectedBrands.includes(phone.brand);
        const priceMatch =
          this.selectedPriceRanges.length === 0 ||
          this.selectedPriceRanges.some((range) => {
            const [min, max] = range
              .split("-")
              .map((v) => (v === "+" ? Infinity : Number(v)));
            return phone.price >= min && phone.price <= max;
          });
        const yearMatch =
          this.selectedYearRanges.length === 0 ||
          this.selectedYearRanges.some((range) => {
            const [min, max] = range
              .split("-")
              .map((v) => (v === "+" ? Infinity : Number(v)));
            return phone.release_year >= min && phone.release_year <= max;
          });
        const colorMatch =
          this.selectedColorRanges.length === 0 ||
          this.selectedColorRanges.includes(phone.color);
        const portMatch =
          this.selectedPortRanges.length === 0 ||
          this.selectedPortRanges.includes(String(phone.has_infrared));
        const bluetoothMatch =
          this.selectedBluetoothRanges.length === 0 ||
          this.selectedBluetoothRanges.includes(String(phone.has_bluetooth));
        return (
          searchMatch &&
          brandMatch &&
          priceMatch &&
          yearMatch &&
          colorMatch &&
          portMatch &&
          bluetoothMatch
        );
      });
    },
  },
  async created() {
    await this.fetchPhones();
  },
  methods: {
    async fetchPhones() {
      try {
        const response = await axios.get("http://localhost:3000/api/phones", {
          params: {
            page: this.currentPage,
            limit: this.limit,
          },
        });

        this.phones = response.data.data;
        this.totalPages = response.data.totalPages;
      } catch (error) {
        console.error("Error fetching phones:", error);
      }
    },
    changePage(newPage) {
      if (newPage >= 1 && newPage <= this.totalPages) {
        this.currentPage = newPage;
        this.fetchPhones();
      }
    },
    submitFilters() {
      console.log("Фільтри застосовані:", {
        search: this.searchText,
        brands: this.selectedBrands,
        prices: this.selectedPriceRanges,
        years: this.selectedYearRanges,
        colors: this.selectedColorRanges,
        ports: this.selectedPortRanges,
        bluetooth: this.selectedBluetoothRanges,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.catalog-view,
.filter,
.wrapper {
  background-color: white !important;
}

.wrapper {
  min-height: 60vh;
}
.catalog-view {
  padding: 1rem;
}

.mt-3 {
  margin-top: 1rem !important;
}
.py-3 {
  padding-top: 1rem !important;
  padding-bottom: 1rem !important;
}
</style>
