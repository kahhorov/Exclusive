import axios from "axios";

export const BASE_URL = "https://ecommercev01.pythonanywhere.com";

const api = axios.create({
    baseURL: `${BASE_URL}/`,
});
function addToken(request) {
    const token = localStorage.getItem("token")
    if (token) {
        request.headers.Authorization = `Bearer ${token}`
    }
    return request
}

api.interceptors.request.use(addToken)

export function getImageUrl(image) {
    if (Array.isArray(image)) image = image[0]
    if (image && image.file) image = image.file
    if (typeof image !== "string") return ""

    if (image.startsWith("/media")) return BASE_URL + image
    return image
}

export function getList(data) {
    if (Array.isArray(data)) return data

    for (const key in data) {
        if (Array.isArray(data[key])) return data[key]
    }
    return []
}

export async function getCartItems() {
    const res = await api.get("order/cart-items/")
    const items = getList(res.data)

    return Promise.all(items.map(async (item) => {
        const productId = item.product?.id || item.product_id || item.product
        try {
            const detail = await api.get(`product/detail/?product_id=${productId}`)
            return { ...item, product: { ...item.product, ...detail.data } }
        } catch (error) {
            console.log(error)
            return item
        }
    }))
}

export async function addToCart(productId) {
    const res = await api.get(`product/detail/?product_id=${productId}`)
    const allProperties = res.data.properties || {}

    const properties = {}
    for (const key in allProperties) {
        properties[key] = allProperties[key][0]
    }

    return api.post("order/add-to-cart/", {
        product_id: productId,
        quantity: 1,
        count: 1,
        properties,
    })
}

export default api;
