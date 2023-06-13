import axios from "axios";
const SERVER_PORT = import.meta.env.VITE_SERVER_PORT;

const users_url = `http://localhost:${SERVER_PORT}/api/users`;

export const getUser = async () => {
  return await axios.get(`${users_url}/me`, { withCredentials: true });
};
export const login = async (credentials) => {
  return await axios.post(`${users_url}/login`, credentials, {
    withCredentials: true,
  });
};

export const register = async (user) => {
  return await axios.post(`${users_url}/register`, user);
};

export const logout = async () => {
  return await axios.post(`${users_url}/logout`, null, {
    withCredentials: true,
  });
};

export const verifyEmail = async (token) => {
  return await axios.get(`${users_url}/verify-email/${token}`);
};

export const getVerification = async (email) => {
  return await axios.post(`${users_url}/verify-email`, { email });
};

export const resetPassword = async (email) => {
  return await axios.post(`${users_url}/reset-password`, { email });
};

export const getRateLimitInfo = async (email) => {
  try {
    const response = await axios.get(`${users_url}/rateLimitInfo/${email}`);
    return response;
  } catch (error) {
    console.error("Error fetching rate limit information:", error);
    throw error;
  }
};
