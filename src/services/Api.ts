import axios from "axios";

const api = axios.create({
    baseURL: "http://3.38.191.196/api",
});

// 요청 인터셉터로 accessToken 추가
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = (email: string, password: string) => {
    return api.post("/sign-in", { email, password });
};

export default api;