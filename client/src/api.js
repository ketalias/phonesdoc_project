import axios from "axios";

const API = axios.create({
  baseURL: process.env.VUE_APP_API_URL || "http://localhost:3000",
});

const token = sessionStorage.getItem("token");
if (token) {
  API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default API;
