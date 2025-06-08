import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/catalog",
    name: "catalog",
    component: () => import("../views/CatalogView.vue"),
  },
  {
    path: "/phone/:id",
    name: "phoneinfo",
    component: () => import("../views/PhoneInfoView.vue"),
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import("../views/AuthView.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../views/AdminView.vue"),
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("../views/ShoppingCartView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFoundView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!token) {
      return next("/login");
    }
    if (to.matched.some((record) => record.meta.requiresAdmin)) {
      if (role !== "admin") {
        alert("Доступ заборонено: потрібна роль адміністратора");
        return next(false);
      }
    }
  }
  next();
});

export default router;
