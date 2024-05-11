<script setup lang="ts">
import { ref } from "vue";
import { loginUser } from "../services/auth.service";

const username = ref<string>("");
const password = ref<string>("");
const responseData = ref<string>("");

const handleLogin = async () => {
  try {
    responseData.value = await loginUser(username.value, password.value);
    console.log("Logged in successfully:", responseData.value);
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div class="login">
    <label for="name">Username</label><input v-model="username" type="text" />
    <label for="password">Password</label
    ><input v-model="password" type="text" />
    <button type="submit" @click="handleLogin">Login</button>
  </div>
</template>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid grey;
  margin: 0 auto;
  padding: 20px;
  gap: 10px;
}
</style>
