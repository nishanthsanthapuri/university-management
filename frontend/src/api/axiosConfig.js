import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
} from "../utils/tokenService";

const api = axios.create({
  baseURL: "http://localhost:8081",
});

// 🔐 Attach access token to every request
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔁 Auto refresh token on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;

      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) throw new Error("No refresh token");

        const api = axios.create({
          baseURL: import.meta.env.VITE_API_BASE_URL,
        });

        const res = await axios.post(
          "http://localhost:8081/auth/refresh",
          null,
          { params: { refreshToken } }
        );

        setTokens(res.data.accessToken, refreshToken);

        error.config.headers.Authorization = `Bearer ${res.data.accessToken}`;

        return api(error.config);
      } catch {
        clearTokens();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
