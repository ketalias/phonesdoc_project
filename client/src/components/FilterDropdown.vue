<template>
  <div class="filter-group">
    <button
      class="btn w-100 fw-bold border-bottom border-0 align-items-center d-flex justify-content-between"
      style="background-color: #f8f9fa"
      type="button"
      @click="toggleMenu"
    >
      <p>{{ title }}</p>
      <span>
        <i v-if="isOpen" class="bi bi-chevron-up"></i>
        <i v-else class="bi bi-chevron-down"></i>
      </span>
    </button>
    <div
      v-if="isOpen"
      class="filter-menu w-100 shadow-sm border-0"
      style="min-width: 200px"
    >
      <input
        v-if="showSearch"
        type="text"
        class="form-control mb-1"
        v-model="localSearchText"
        placeholder="Пошук..."
      />
      <div v-for="option in filteredOptions" :key="option.value">
        <div class="form-check mb-1 d-flex align-items-center">
          <input
            class="form-check-input"
            type="checkbox"
            :id="`${filterKey}-${option.value}`"
            :value="option.value"
            v-model="localSelected"
            @change="emitChange"
          />
          <label
            class="form-check-label fw-normal ms-2 d-flex align-items-center"
            :for="`${filterKey}-${option.value}`"
          >
            <span
              v-if="option.colorCode"
              class="color-swatch"
              :style="{ backgroundColor: option.colorCode }"
            ></span>
            {{ option.label }}
          </label>
        </div>
      </div>
      <div v-if="filteredOptions.length === 0" class="text-muted p-1">
        Нічого не знайдено
      </div>
      <hr class="dropdown-divider" />
    </div>
  </div>
</template>

<script>
export default {
  name: "FilterDropdown",
  props: {
    title: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    selected: {
      type: Array,
      required: true,
    },
    filterKey: {
      type: String,
      required: true,
    },
    showSearch: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isOpen: false,
      localSearchText: "",
    };
  },
  computed: {
    filteredOptions() {
      if (!this.showSearch) return this.options;
      return this.options.filter((opt) =>
        opt.label.toLowerCase().includes(this.localSearchText.toLowerCase())
      );
    },
    localSelected: {
      get() {
        return this.selected;
      },
      set(value) {
        this.$emit("update:selected", value);
      },
    },
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    emitChange() {
      this.$emit("change");
    },
  },
};
</script>

<style scoped>
button {
  background-color: white !important;
  border-radius: 0;
}
.filter-menu {
  border-radius: 0;
  border-bottom: 1px solid #ced4da;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-top: 0;
  padding: 0.25rem;
}

.btn-light {
  border-radius: 0;
}

.form-control {
  border-radius: 0;
  margin-bottom: 0.25rem !important;
}

.color-swatch {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
  vertical-align: middle;
}
</style>
