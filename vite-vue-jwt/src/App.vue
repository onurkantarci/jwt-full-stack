<script setup lang="ts">
import { ref } from "vue";
import { isAuthenticated, logoutUser } from "./services/auth.service";

const _isAuthenticated = ref(isAuthenticated);

const handleLogout = async () => {
  try {
    await logoutUser();
    console.log("Logged out successfully");
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div class="routers">
    <router-link to="/">Home</router-link>
    <router-link to="/register">Register</router-link>
    <router-link v-if="!_isAuthenticated" to="/login">Login</router-link>
    <button class="logout-button" v-else @click="handleLogout">Logout</button>
  </div>
  <router-view />
</template>

<style scoped>
.routers {
  display: flex;
  gap: 10px;
}
.logout-button {
  max-width: 60px;
}
</style>
