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

// path: "/media/..." satri, { file } obyekti yoki ulardan iborat massiv bo'lishi mumkin
export function getImageUrl(path) {
    if (Array.isArray(path)) path = path[0];
    if (!path) return "";
    if (typeof path === "object") path = path.file;
    if (!path) return "";
    if (/^(https?:|data:|blob:)/.test(path) || !path.startsWith("/media")) return path;
    return BASE_URL + path;
}

// backend ba'zan massiv, ba'zan { ...: [...] } ko'rinishida qaytaradi
export function getList(data) {
    if (Array.isArray(data)) return data;
    if (data && typeof data === "object") {
        return Object.values(data).find(Array.isArray) || [];
    }
    return [];
}

// backend rang/o'lcham (properties) ni talab qiladi, shuning uchun
// mahsulot sahifasidagi kabi har biridan birinchi qiymat tanlanadi
export async function addToCart(productId, quantity = 1) {
    const res = await api.get(`product/detail/?product_id=${productId}`);
    const properties = {};
    for (const [key, values] of Object.entries(res.data.properties || {})) {
        if (values.length > 0) properties[key] = values[0];
    }
    return api.post("order/add-to-cart/", {
        product_id: productId,
        quantity,
        count: quantity,
        properties,
    });
}

export default api;
