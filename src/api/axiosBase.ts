import axios from "axios";

export function configureDefaults(): void {
  axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

  axios.interceptors.request.use((config: any) => {
    try {
      const auth = localStorage.getItem("auth");
      if (config.headers) {
        config.headers["Authorization"] = auth ? `Basic ${auth}` : undefined;
      }
      return config;
    } catch (error: unknown) {
      throw error;
    }
  });
}
