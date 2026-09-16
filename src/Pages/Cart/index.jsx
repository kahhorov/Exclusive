import { useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { Breadcrumb } from "rsuite";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api, { getImageUrl } from "../../Axios/Api";


function Cart() {
    const [cartItems, setCartItems] = useState([])
    const subtotal = cartItems.reduce((sum, item) => sum + Number(item.product?.discount_price || item.product?.price || 0) * item.quantity, 0);
    const shipping = 0;
    const total = subtotal + shipping;

    const navigate = useNavigate()

    async function getCart() {
        if (!localStorage.getItem("token")) {
            toast.warning("Avval tizimga kiring")
            navigate("/login")
            return
        }
        try {
            const res = await api.get("order/cart-items/")
            setCartItems(res.data || [])
        } catch (error) {
            console.log(error);
        }
    }

    async function removeCart(id) {
        try {
            await api.delete(`order/remove-from-cart?cart_item_id=${id}`)
            setCartItems(cartItems.filter((item) => item.id !== id))
            toast.info("Savatdan o'chirildi")
        } catch (error) {
            console.log(error);
            toast.error("Xatolik yuz berdi")
        }
    }

    function changeCount(id, value) {
        setCartItems(cartItems.map((item) => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + value) } : item))
    }

    useEffect(() => {
        getCart()
    }, [])

    return (
        <div className="border-gray-300 border-t">
            <div className="container py-10">

                {/* Breadcrumb */}
                <Breadcrumb aria-label="breadcrumb">
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Cart</Breadcrumb.Item>
                </Breadcrumb>

                <div className="grid grid-cols-4 items-center py-5 px-8 mt-10 rounded-lg bg-white shadow-sm border border-gray-100 text-sm">
                    <span>Product</span>
                    <span>Price</span>
                    <span>Quantity</span>
                    <span className="text-right">Subtotal</span>
                </div>

                <div className="flex flex-col gap-5 mt-5">

                    {cartItems.length === 0 && (
                        <p className="py-10 text-center text-sm text-gray-400">Savat bo'sh</p>
                    )}

                    {cartItems.map((item) => {
                        const price = Number(item.product?.discount_price || item.product?.price || 0)
                        return (
                    <div key={item.id} className="grid grid-cols-4 items-center py-6 px-8 rounded-lg bg-white shadow-sm">

                        <div className="flex items-center gap-4">
                            <button onClick={() => removeCart(item.id)} className="text-gray-400 hover:text-red-500 transition">
                                <IoTrashOutline size={18} />
                            </button>

                            <img
                                src={getImageUrl(item.product?.pictures?.[0])}
                                alt={item.product?.title}
                                className="w-[60px] h-[60px] object-contain"
                            />

                            <p className="text-sm font-medium">
                                {item.product?.title?.split(" ").length > 5 ? item.product.title.split(" ").slice(0, 5).join(" ") + "..." : item.product?.title}
                            </p>
                        </div>

                        <p className="text-sm">
                            ${price}
                        </p>

                        <div className="flex justify-start">
                            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">

                                <button
                                    onClick={() => changeCount(item.id, 1)}
                                    className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition"
                                >
                                    <FaPlus size={10} />
                                </button>

                                <span className="w-10 h-9 flex items-center justify-center border-x border-gray-300 text-sm">
                                    {String(item.quantity).padStart(2, "0")}
                                </span>

                                <button
                                    onClick={() => changeCount(item.id, -1)}
                                    disabled={item.quantity === 1}
                                    className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition disabled:text-gray-300 disabled:hover:bg-white"
                                >
                                    <FaMinus size={10} />
                                </button>

                            </div>
                        </div>

                        <p className="text-sm text-right">
                            ${(price * item.quantity).toFixed(2)}
                        </p>

                    </div>
                        )
                    })}
                </div>

                <div className="flex justify-between items-center mt-5">

                    <button
                        onClick={() => navigate("/")}
                        className="px-7 py-3 border-gray-400 !border  !rounded-md text-sm
                    hover:bg-black hover:!text-white transition"
                    >
                        Return To Shop
                    </button>

                    <button
                        className="px-7 py-3  border-gray-400 !border !rounded-md text-sm
                    hover:bg-black hover:!text-white transition"
                    >
                        Update Cart
                    </button>

                </div>

                <div className="grid grid-cols-2 gap-10 mt-10">

                    <div className="flex items-start gap-3">

                        <input
                            type="text"
                            placeholder="Coupon Code"
                            className="w-[230px] h-[46px] px-4 border border-gray-400 rounded-md
                        outline-none text-sm focus:border-black"
                        />

                        <button
                            className="h-[46px] px-8 rounded-md bg-red-500 !text-white text-sm
                        hover:bg-red-600 transition"
                        >
                            Apply Coupon
                        </button>

                    </div>

                    <div className="border border-gray-500 rounded-md p-6 max-w-[360px] ml-auto w-full">

                        <h3 className="text-lg font-medium mb-5">
                            Cart Total
                        </h3>

                        <div className="flex justify-between items-center pb-4 border-b border-gray-200 text-sm">
                            <span>Subtotal:</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between items-center py-4 border-b border-gray-200 text-sm">
                            <span>Shipping:</span>
                            <span>
                                {shipping === 0 ? "Free" : `$${shipping}`}
                            </span>
                        </div>

                        <div className="flex justify-between items-center py-4 text-sm">
                            <span>Total:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                        <button onClick={() => navigate("/checkout")}
                            className="w-[180px] h-[45px] block mx-auto mt-2
                        bg-red-500 hover:bg-red-600 !text-white rounded-md text-sm
                        transition"
                        >
                            Proceeds to checkout
                        </button>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default Cart