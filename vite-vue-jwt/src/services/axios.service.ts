import axios from "axios";
import { AxiosRequestConfig } from "axios";
import { router } from "../main";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

interface RetryQueueItem {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  config: AxiosRequestConfig;
}

const refreshAndRetryQueue: RetryQueueItem[] = [];

let isRefreshing = false;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: AxiosRequestConfig = error.config;

    if (error.response.data === "Refresh token not found") {
      localStorage.removeItem("isAuthenticated");
      router.push("/login");
      location.reload();
      return;
    }

    if (error.response && error.response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          await axiosInstance.post("/token");

          refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
            axiosInstance
              .request(config)
              .then((response) => resolve(response))
              .catch((err) => reject(err));
          });
          refreshAndRetryQueue.length = 0;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          throw refreshError;
        } finally {
          isRefreshing = false;
        }
      }
      return new Promise<void>((resolve, reject) => {
        refreshAndRetryQueue.push({ config: originalRequest, resolve, reject });
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
