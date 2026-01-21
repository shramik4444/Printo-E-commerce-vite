import axios from "axios";

const adminApi = axios.create({
    baseURL: "http://localhost:5002/admin",
});

adminApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // admin JWT

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default adminApi;
