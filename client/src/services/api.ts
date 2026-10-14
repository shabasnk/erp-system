import axios from "axios";

const configuredBaseURL = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
const baseURL = configuredBaseURL
  ? configuredBaseURL.endsWith("/api")
    ? configuredBaseURL
    : `${configuredBaseURL}/api`
  : "/api";

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
