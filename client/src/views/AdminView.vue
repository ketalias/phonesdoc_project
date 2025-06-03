<template>
  <div class="container mt-5 admin-panel text-center">
    <h1>Admin Panel</h1>
    <b-button variant="success" class="mb-3" @click="showAddModal"
      >Add Phone</b-button
    >
    <b-button variant="dark" class="mb-3" @click="loadPhones">Refresh</b-button>

    <b-table :items="phones" :fields="fields" striped hover>
      <template #cell(actions)="row">
        <b-button size="sm" @click="edit(row.item)">Edit</b-button>
        <b-button size="sm" variant="danger" @click="remove(row.item.id)"
          >Delete</b-button
        >
      </template>
    </b-table>

    <div
      class="modal fade"
      id="phoneModal"
      tabindex="-1"
      aria-labelledby="phoneModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="phoneModalLabel">{{ modalTitle }}</h5>
            <button
              type="button"
              class="btn-close"
              @click="hideModal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <b-form @submit.prevent="save">
              <b-form-group label="Fullname">
                <b-form-input v-model="form.fullname" required />
              </b-form-group>
              <b-form-group label="Brand">
                <b-form-input v-model="form.brand" required />
              </b-form-group>
              <b-form-group label="Release Year">
                <b-form-input
                  type="number"
                  v-model="form.release_year"
                  required
                />
              </b-form-group>
              <b-form-group label="Colors">
                <b-form-input v-model="form.colors" />
              </b-form-group>
              <b-form-group label="Bluetooth">
                <b-form-checkbox v-model="form.has_bluetooth" />
              </b-form-group>
              <b-form-group label="Infrared">
                <b-form-checkbox v-model="form.has_infrared" />
              </b-form-group>
              <b-form-group label="Price">
                <b-form-input type="number" v-model="form.price" required />
              </b-form-group>
              <b-form-group label="Old Price">
                <b-form-input type="number" v-model="form.old_price" />
              </b-form-group>
              <b-form-group label="Photo URL">
                <b-form-input v-model="form.photo_url" />
              </b-form-group>
              <b-form-group label="Memory Size">
                <b-form-input v-model="form.memory_size" />
              </b-form-group>
              <b-form-group label="Screen Size">
                <b-form-input v-model="form.screen_size" />
              </b-form-group>
              <b-form-group label="CPU">
                <b-form-input v-model="form.cpu" />
              </b-form-group>
              <b-form-group label="Battery Capacity">
                <b-form-input v-model="form.battery_capacity" />
              </b-form-group>
              <b-form-group label="Description">
                <b-form-textarea v-model="form.description" rows="3" />
              </b-form-group>
              <b-form-group label="Refresh Rate">
                <b-form-input v-model="form.refresh_rate" />
              </b-form-group>
              <b-form-group label="Resolution">
                <b-form-input v-model="form.resolution" />
              </b-form-group>
              <b-form-group label="Screen Type">
                <b-form-input v-model="form.screen_type" />
              </b-form-group>
              <b-form-group label="Number of Cores">
                <b-form-input type="number" v-model="form.number_of_cores" />
              </b-form-group>
              <div class="modal-footer">
                <b-button type="submit" variant="primary">Save</b-button>
                <b-button variant="secondary" @click="hideModal"
                  >Cancel</b-button
                >
              </div>
            </b-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from "../api"; // шлях залежить від структури, можливо "../../api"
import { Modal } from "bootstrap";

export default {
  data() {
    return {
      phones: [],
      fields: [
        "id",
        "fullname",
        "brand",
        "price",
        { key: "actions", label: "Actions" },
      ],
      modalTitle: "Add Phone",
      modalVisible: false,
      modalInstance: null,
      editId: null,
      form: {
        fullname: "",
        brand: "",
        release_year: null,
        colors: "",
        has_bluetooth: false,
        has_infrared: false,
        price: null,
        old_price: null,
        photo_url: "",
        memory_size: "",
        screen_size: "",
        cpu: "",
        battery_capacity: "",
        description: "",
        refresh_rate: "",
        resolution: "",
        screen_type: "",
        number_of_cores: null,
      },
    };
  },
  methods: {
    async loadPhones() {
      try {
        const res = await API.get("/api/phones?limit=150&page=1");
        this.phones = res.data.data;
      } catch (error) {
        console.error("Failed to load phones:", error);
      }
    },
    showAddModal() {
      this.resetForm();
      this.modalTitle = "Add Phone";
      this.showModal();
    },
    edit(phone) {
      this.editId = phone.id;
      this.modalTitle = "Edit Phone";
      this.form = { ...phone };
      this.showModal();
    },
    async save() {
      try {
        if (this.editId) {
          await API.put(`/api/phones/${this.editId}`, this.form);
        } else {
          await API.post(`/api/phones`, this.form);
        }
        this.hideModal();
        this.resetForm();
        await this.loadPhones();
      } catch (error) {
        console.error("Failed to save phone:", error);
      }
    },
    async remove(id) {
      if (confirm("Delete this phone?")) {
        try {
          await API.delete(`/api/phones/${id}`);
          await this.loadPhones();
        } catch (error) {
          console.error("Failed to delete phone:", error);
        }
      }
    },
    resetForm() {
      this.editId = null;
      this.form = {
        fullname: "",
        brand: "",
        release_year: null,
        colors: "",
        has_bluetooth: false,
        has_infrared: false,
        price: null,
        old_price: null,
        photo_url: "",
        memory_size: "",
        screen_size: "",
        cpu: "",
        battery_capacity: "",
        description: "",
        refresh_rate: "",
        resolution: "",
        screen_type: "",
        number_of_cores: null,
      };
    },
    showModal() {
      if (!this.modalInstance) {
        this.modalInstance = new Modal(document.getElementById("phoneModal"));
      }
      this.modalInstance.show();
      this.modalVisible = true;
    },
    hideModal() {
      if (this.modalInstance) {
        this.modalInstance.hide();
      }
      this.modalVisible = false;
      this.resetForm();
    },
  },
  mounted() {
    this.loadPhones();
    this.modalInstance = new Modal(document.getElementById("phoneModal"));
  },
  beforeUnmount() {
    if (this.modalInstance) {
      this.modalInstance.dispose();
      this.modalInstance = null;
    }
  },
};
</script>

<style scoped>
.admin-panel {
  max-width: 960px;
  margin: auto;
}
</style>
