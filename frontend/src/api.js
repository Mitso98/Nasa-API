import axios from "axios";
const SERVER_PORT = import.meta.env.VITE_SERVER_PORT;

const API_URL = `http://localhost:${SERVER_PORT}/api/users`;
export const register = async (user) => {
  return await axios.post(`${API_URL}/register`, user);
};

export const login = async (credentials) => {
  return await axios.post(`${API_URL}/login`, credentials);
};

export const logout = async (token) => {
  return await axios.post(`${API_URL}/logout`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const verifyEmail = async (token) => {
  return await axios.get(`${API_URL}/verify-email/${token}`);
};

export const getVerification = async (email) => {
  return await axios.post(`${API_URL}/verify-email`, { email });
};

export const resetPassword = async (email) => {
  return await axios.post(`${API_URL}/reset-password`, { email });
};

export const getRateLimitInfo = async (email) => {
  try {
    const response = await axios.get(`${API_URL}/rateLimitInfo/${email}`);
    return response;
  } catch (error) {
    console.error("Error fetching rate limit information:", error);
    throw error;
  }
};
