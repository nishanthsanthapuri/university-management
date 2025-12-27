import api from "./axiosConfig";

export const loginUser = (loginRequest) => {
  return api.post("/auth/login", loginRequest);
};

import { getRefreshToken } from "../utils/tokenService";

export const logoutUser = async () => {
  const refreshToken = getRefreshToken();
  return api.post("/auth/logout", null, {
    params: { refreshToken },
  });
};
