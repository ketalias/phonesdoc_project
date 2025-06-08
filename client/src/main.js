import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap";
import BootstrapVue3 from "bootstrap-vue-3";
import { createPinia } from "pinia";
const pinia = createPinia();

createApp(App).use(router).use(pinia).use(BootstrapVue3).mount("#app");
