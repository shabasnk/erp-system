import axios from "axios";

const baseURL = (import.meta.env.VITE_API_URL || "/api").replace(/\/+$/, "");

const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const token = typeof window === "undefined" ? null : localStorage.getItem("token");
  const isPublicAuthRequest = ["auth/login", "auth/register"].includes(config.url ?? "");

  if (token && !isPublicAuthRequest && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const isAxiosError = axios.isAxiosError;

export default api;
