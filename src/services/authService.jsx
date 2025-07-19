import axios from "axios";

const API_URL = process.env.REACT_APP_API_BASE_URL;

export const login = async (data) => {
  console.log("Request Data : ", data);
  return axios.post(`${API_URL}/login`, data);
};

export const register = async (data) => {
  return axios.post(`${API_URL}/register`, data);
};
