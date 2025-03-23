// axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://strapi.local:8080/api", // Set your base URL here
});

export default axiosInstance;
