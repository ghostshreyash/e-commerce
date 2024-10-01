import axios from "axios";

const baseURL= "https://e-commerce-backend-xfcr.onrender.com";

const api = axios.create({baseURL});

export default api;