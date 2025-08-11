import axios from "axios";

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: "/api/v1",
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

export default axiosInstance;
