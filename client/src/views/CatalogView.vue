<template>
  <div>
    <div class="mt-3 wrapper">
      <div class="catalog-view row justify-content-center">
        <button
          class="btn btn-outline-dark d-md-none mb-3"
          @click="showMobileFilters = true"
        >
          Фільтри
        </button>
        <div class="filter col-md-3 d-none d-md-block">
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
        </div>

        <div class="col-md-8">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="mb-0 text-muted fw-normal">
              Знайдено Товарів:
              <strong class="text-dark">{{ totalItems }}</strong>
            </h5>
            <div class="d-flex align-items-center gap-2">
              <select
                id="sort"
                class="form-control"
                v-model="sortOrder"
                @change="submitFilters"
              >
                <option value="">Без сортування</option>
                <option value="asc">Ціна ↑</option>
                <option value="desc">Ціна ↓</option>
              </select>
            </div>
          </div>

          <phones-grid :phones="phones" />
        </div>
        <div class="mobile-filters-modal" v-if="showMobileFilters">
          <div class="modal-content p-3">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="mb-0">Фільтри</h5>
              <button
                class="btn btn-sm btn-outline-secondary"
                @click="showMobileFilters = false"
              >
                ✕
              </button>
            </div>

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
        </div>
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
      showMobileFilters: false,
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      limit: 12,
      phones: [],
      searchText: "",
      sortOrder: "",
      selectedBrands: [],
      selectedPriceRanges: [],
      selectedYearRanges: [],
      selectedColorRanges: [],
      selectedPortRanges: [],
      selectedBluetoothRanges: [],
      allPhones: [],
      priceRanges: [
        { label: "До $500", value: "0-500" },
        { label: "$500 - $1000", value: "500-1000" },
        { label: "Понад $1000", value: "1000-10000" },
      ],
      yearRanges: [
        { label: "До 2015", value: "0-2015" },
        { label: "2016", value: "2016" },
        { label: "2017", value: "2017" },
        { label: "2018", value: "2018" },
        { label: "2019", value: "2019" },
        { label: "2020", value: "2020" },
        { label: "2021", value: "2021" },
        { label: "2022", value: "2022" },
        { label: "2023", value: "2023" },
        { label: "2024+", value: "2024+" },
      ],
    };
  },
  computed: {
    brandOptions() {
      const brands = [...new Set(this.allPhones.map((p) => p.brand))];
      return brands.map((brand) => ({ label: brand, value: brand }));
    },
  },
  async created() {
    await this.fetchPhones();
    await this.fetchAllPhones();
  },
  methods: {
    async fetchPhones(page = 1) {
      const params = {
        page,
        limit: this.limit,
        search: this.searchText || undefined,
        brands: this.selectedBrands.join(",") || undefined,
        prices: this.selectedPriceRanges.join(",") || undefined,
        years: this.selectedYearRanges.join(",") || undefined,
        colors: this.selectedColorRanges.join(",") || undefined,
        ports: this.selectedPortRanges.join(",") || undefined,
        bluetooth: this.selectedBluetoothRanges.join(",") || undefined,
        sort: this.sortOrder || undefined,
      };

      try {
        const res = await axios.get("http://localhost:3000/api/phones", {
          params,
        });
        this.phones = res.data.data;
        this.totalPages = res.data.totalPages;
        this.totalItems = res.data.totalItems;
        this.currentPage = page;
      } catch (err) {
        console.error("Помилка при отриманні телефонів:", err);
      }
    },
    async fetchAllPhones() {
      try {
        const res = await axios.get("http://localhost:3000/api/phones", {
          params: { limit: 1000 },
        });
        this.allPhones = res.data.data;
      } catch (err) {
        console.error("Помилка при отриманні всіх телефонів:", err);
      }
    },
    submitFilters() {
      this.fetchPhones(1);
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.fetchPhones(page);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
  // border: 1px solid black;
}

.mobile-filters-modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem 1rem;
  overflow-y: auto;

  .modal-content {
    background-color: #fff;
    border-radius: 8px;
    max-width: 500px;
    width: 100%;
  }
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
