import axios from "axios";

export const BASE_URL = "https://ecommercev01.pythonanywhere.com";

const api = axios.create({
    baseURL: `${BASE_URL}/`,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export function getImageUrl(path) {
    if (!path) return "";
    if (typeof path === "object") path = path.file;
    if (!path) return "";
    if (/^(https?:|data:|blob:)/.test(path) || !path.startsWith("/media")) return path;
    return BASE_URL + path;
}

export default api;
