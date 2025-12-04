import axios from "axios";

// Point this to your Django server
export const API_BASE = import.meta.env.VITE_API_BASE;

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // include session + CSRF cookies
});

// Read csrftoken cookie
function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()!.split(";").shift();
  return undefined;
}

// Attach CSRF token to unsafe methods
api.interceptors.request.use((config) => {
  const method = (config.method || "get").toLowerCase();
  const needsCsrf = ["post", "put", "patch", "delete"].includes(method);
  if (needsCsrf) {
    const csrfToken = getCookie("csrftoken");
    if (csrfToken) {
      // Axios v1 uses AxiosHeaders type; set header safely
      if (config.headers && typeof (config.headers as any).set === "function") {
        (config.headers as any).set("X-CSRFToken", csrfToken);
      } else {
        config.headers = { ...(config.headers as Record<string, any>), "X-CSRFToken": csrfToken } as any;
      }
    }
  }
  return config;
});

export default api;