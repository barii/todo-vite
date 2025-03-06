import axios from "axios";
import {getAuthToken} from "@/authProvider.ts";

// Create an Axios instance
const api = axios.create({
    baseURL: "", // Replace with your API base URL
});

// Request Interceptor: Attach token to headers
api.interceptors.request.use(
    (config) => {
        const token = getAuthToken(); // Retrieve token from localStorage
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;