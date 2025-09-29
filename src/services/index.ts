import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";
// eslint-disable-next-line

const baseURL = import.meta.env.VITE_API_BASE_URL;
console.log("baseURL", baseURL)

// Create Axios instance with base URL from env
const API = axios.create({
  baseURL
});

// Request interceptor to attach token (if any) from localStorage
API.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;
    if (user?.token) {
      // eslint-disable-next-line
      config.headers = config.headers || {} as any;

      config.headers.Authorization = `Bearer ${user.token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
