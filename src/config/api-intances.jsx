import axios from "axios";
import useStore from "../zustand-store/store"; // Import Zustand store

const AxiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
});

// Interceptor to attach token dynamically
AxiosInstance.interceptors.request.use(
  (config) => {
    const { token } = useStore.getState(); // Get token from Zustand store
    console.log("token in interceptor", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default AxiosInstance;
