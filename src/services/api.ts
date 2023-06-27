import axios from "axios";

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_URL_API, timeout: 15000 });

let retryCount = 0;

api.interceptors.request.use(
  (config) => config,
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED" && error.message.includes("timeout") && retryCount < 3) {
      retryCount++;
      return new Promise((resolve) => {
        setTimeout(() => resolve(api.request(error.config)), 1000);
      });
    }
    return Promise.reject(error);
  }
);

export { api };
