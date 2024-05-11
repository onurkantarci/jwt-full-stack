<script setup lang="ts">
import axiosService from "../services/axios.service";
import { ref, onMounted } from "vue";

const responseData = ref<string>("");

async function getUsers() {
  responseData.value = "";
  try {
    const response = await axiosService.get("/protected");
    if (!response?.data) {
      throw new Error("Failed to fetch data");
    } else {
      responseData.value = response.data;
    }
  } catch (error) {
    console.error(error);
  }
}

onMounted(async () => {
  getUsers();
});
</script>

<template>
  <div class="data">{{ responseData }}</div>
  <button
    @click="
      getUsers();
      getUsers();
      getUsers();
      getUsers();
      // getUsers();
      // getUsers();
      // getUsers();
      // getUsers();
      // getUsers();
      // getUsers();
      // getUsers();
      // getUsers();
      // getUsers();
      // getUsers();
    "
  >
    GET
  </button>
</template>

<style scoped>
.data {
  display: flex;
  background-color: rgba(255, 166, 0, 0.11);
}
</style>
