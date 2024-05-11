import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import Register from "./components/Register.vue";
import Login from "./components/Login.vue";
import App from "./App.vue";
import { isAuthenticated } from "./services/auth.service";

const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home, meta: { requiresAuth: true } },
    { path: "/register", component: Register, meta: { requiresAuth: false } },
    { path: "/login", component: Login, meta: { requiresAuth: true } },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (to.path === "/login") {
      if (isAuthenticated.value) {
        next({ path: "/" });
        return;
      } else {
        next();
        return;
      }
    }

    if (!isAuthenticated.value) {
      next({ path: "/login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

app.use(router);
app.mount("#app");

export { router };
