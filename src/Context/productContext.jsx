import { createContext, useContext, useEffect, useState } from "react";
import api, { getList } from "../Axios/Api";

const ProductContext = createContext(null)

export function ProductProvider({ children }) {
    const [wishlistCount, setWishlistCount] = useState(0)
    const [cartCount, setCartCount] = useState(0)

    async function refreshWishlist() {
        if (!localStorage.getItem("token")) {
            setWishlistCount(0)
            return
        }
        try {
            const res = await api.get("action/my-wishlist/")
            setWishlistCount(getList(res.data).length)
        } catch (error) {
            console.log(error);
        }
    }

    async function refreshCart() {
        if (!localStorage.getItem("token")) {
            setCartCount(0)
            return
        }
        try {
            const res = await api.get("order/cart-items/")
            setCartCount(getList(res.data).length)
        } catch (error) {
            console.log(error);
        }
    }

    function refreshCounts() {
        refreshWishlist()
        refreshCart()
    }

    useEffect(() => {
        refreshCounts()
    }, [])

    return (
        <ProductContext.Provider value={{ wishlistCount, cartCount, refreshWishlist, refreshCart, refreshCounts }}>
            {children}
        </ProductContext.Provider>
    )
}

export function useProductCounts() {
    return useContext(ProductContext)
}
