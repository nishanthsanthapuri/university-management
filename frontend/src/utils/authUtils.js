import { getAccessToken } from "./tokenService";

export const isAuthenticated = () => {
  const token = getAccessToken();
  return !!token;
};
