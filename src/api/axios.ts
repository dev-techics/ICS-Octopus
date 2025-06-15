import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost/cms",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
