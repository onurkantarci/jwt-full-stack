import axiosService from "./axios.service";
import { router } from "../main";
import { ref } from "vue";

export const isAuthenticated = ref(
  localStorage.getItem("isAuthenticated") === "true"
);

export const registerUser = async (username: string, password: string) => {
  try {
    const response = await axiosService.post("/register", {
      username: username,
      password: password,
    });
    if (!response.data) {
      throw new Error("Failed To register user");
    }
    router.push("/login");
    return response.data.message;
  } catch (error) {
    console.error(error);
  }
};

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axiosService.post("/login", {
      username: username,
      password: password,
    });
    if (!response.data) {
      throw new Error("Failed to login user");
    }
    isAuthenticated.value = true;
    localStorage.setItem("isAuthenticated", "true");
    window.dispatchEvent(new Event("storage"));
    router.push("/");
    return response.data.message;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axiosService.post("/logout");

    if (!response.data) {
      throw new Error("Failed to logout user");
    }
    isAuthenticated.value = false;
    localStorage.removeItem("isAuthenticated");
    router.push("/login");
    return response.data.message;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
