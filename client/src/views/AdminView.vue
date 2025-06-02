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

    <!-- Bootstrap 5 Modal -->
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
              <b-form-group label="Color">
                <b-form-input v-model="form.color" required />
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
              <b-form-group label="Photo URL">
                <b-form-input v-model="form.photo_url" />
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
import axios from "axios";
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
      modalInstance: null, // Bootstrap Modal instance
      editId: null,
      form: {
        fullname: "",
        brand: "",
        release_year: null,
        color: "",
        has_bluetooth: false,
        has_infrared: false,
        price: null,
        photo_url: "",
      },
    };
  },
  methods: {
    async loadPhones() {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/phones?limit=150&page=1"
        );
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
          await axios.put(
            `http://localhost:3000/api/phones/${this.editId}`,
            this.form
          );
        } else {
          await axios.post(`http://localhost:3000/api/phones`, this.form);
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
          await axios.delete(`http://localhost:3000/api/phones/${id}`);
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
        color: "",
        has_bluetooth: false,
        has_infrared: false,
        price: null,
        photo_url: "",
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
    // Initialize modal instance
    this.modalInstance = new Modal(document.getElementById("phoneModal"));
  },
  beforeUnmount() {
    // Clean up modal instance
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
