import axios from "axios";
const SERVER_PORT = import.meta.env.VITE_SERVER_PORT;

const apod_url = `http://localhost:${SERVER_PORT}/api/apod`;

export const getApod = async (options) => {
  return await axios.post(`${apod_url}/get`,options);
};
