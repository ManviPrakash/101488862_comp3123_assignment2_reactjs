import axios from "axios";

const API = axios.create({
  baseURL: "http://one01488862-comp3123-assignment1-1.onrender.com/api/v1",
});

// ADD AUTH TOKEN TO EVERY REQUEST
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;