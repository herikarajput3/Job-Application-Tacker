import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

// Attach Token Automatically

API.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {

        config.headers.Authorization =
            `Bearer ${token}`;

    }

    return config;

});

API.interceptors.response.use(

    (response) => response,

    async (error) => {

        const originalRequest =
            error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            const response =
                await API.post(
                    "/auth/refresh"
                );

            const newAccessToken =
                response.data.token;

            localStorage.setItem(
                "token",
                newAccessToken
            );

            originalRequest.headers.Authorization =
                `Bearer ${newAccessToken}`;

            return API(originalRequest);
        }

        return Promise.reject(error);
    }

);

export default API;