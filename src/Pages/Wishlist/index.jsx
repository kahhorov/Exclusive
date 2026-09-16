import Animate from "../../components/Animate"
import OutlineButton from "../../components/OutlineButton"
import Products from "../../components/products"
import { IoCartOutline, IoTrashOutline } from "react-icons/io5"
import api, { getImageUrl } from "../../Axios/Api"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"

function Wishlist() {
    const navigate = useNavigate()
    const [wishlist, setWishlist] = useState([])

    async function getWishlist() {
        if (!localStorage.getItem("token")) {
            toast.warning("Avval tizimga kiring")
            navigate("/login")
            return
        }
        try {
            const res = await api.get("action/my-wishlist/")
            setWishlist((res.data || []).map((item) => item.product ?? item))
        } catch (error) {
            console.log(error);
        }
    }

    async function removeWishlist(id) {
        try {
            await api.delete(`action/remove-from-wishlist/?product_id=${id}`)
            setWishlist(wishlist.filter((p) => p.id !== id))
            toast.info("Sevimlilardan o'chirildi")
        } catch (error) {
            console.log(error);
            toast.error("Xatolik yuz berdi")
        }
    }

    async function addCart(id) {
        try {
            await api.post("order/add-to-cart/", {
                product_id: id,
                quantity: 1,
                count: 1
            })
            toast.success("Savatga qo'shildi")
        } catch (error) {
            console.log(error);
            toast.error("Xatolik yuz berdi")
        }
    }

    async function moveAllToBag() {
        if (wishlist.length === 0) return
        try {
            await Promise.all(wishlist.map((p) => api.post("order/add-to-cart/", {
                product_id: p.id,
                quantity: 1,
                count: 1
            })))
            toast.success("Barchasi savatga qo'shildi")
            navigate("/cart")
        } catch (error) {
            console.log(error);
            toast.error("Xatolik yuz berdi")
        }
    }

    useEffect(() => {
        getWishlist()
    }, [])

    return (
        <div className="border-gray-300 border-t py-10">
            <div className="container">
                <div className="flex justify-between py-10">
                    <p className="!text-lg !font-light lg:text-xl lg:font-bold">Wishlist ({wishlist.length})</p>
                    <OutlineButton text={"Move All To Bag"} onClick={moveAllToBag} />

                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-10">
                    {wishlist.map((p) => {
                        return (
                            <div
                                key={p.id}
                                className="group relative overflow-hidden rounded-xl bg-white"
                            >
                                <div className="relative flex  w-full h-[230px] items-center justify-center overflow-hidden rounded-xl bg-gray-100 p-5">

                                    <Link to={`/product/detail/${p.id}`} className="h-full w-full">
                                    <img
                                        src={getImageUrl(p.pictures?.[0])}
                                        alt={p.title}
                                        className="
                h-full w-full object-contain
                transition-all duration-500 ease-out
                group-hover:scale-105
            "
                                    />
                                    </Link>

                                    {p.discount_percent > 0 && (
                                        <span
                                            className="
                    absolute left-2 top-2 z-20
                    rounded-md bg-secondary-10
                    px-2 py-1
                    text-[11px] font-medium text-white
                "
                                        >
                                            -{p.discount_percent}%
                                        </span>
                                    )}

                                    {/* Trash Button */}
                                    <button
                                        onClick={() => removeWishlist(p.id)}
                                        className="
                                                   absolute right-2 top-2 z-20
                                                   flex h-9 w-9 items-center justify-center
                                                   !rounded-full bg-white
                                                   text-gray-800 shadow-md
                                                   opacity-0 scale-75
                                                   translate-y-[-6px]
                                                   transition-all duration-300 ease-out
                                                   group-hover:opacity-100
                                                   group-hover:scale-100
                                                   group-hover:translate-y-0                                   
                                                   hover:bg-gray-50
                                                   hover:scale-110 active:scale-95"
                                    >
                                        <IoTrashOutline className="text-[18px]" />
                                    </button>

                                    {/* Add To Cart */}
                                    <button
                                        onClick={() => addCart(p.id)}
                                        className="
                absolute bottom-0 left-0 z-20
                flex h-[38px] w-full
                items-center justify-center gap-2
                bg-black
                text-[12px] font-medium !text-white

                translate-y-full
                opacity-0

                transition-all duration-300 ease-out

                group-hover:translate-y-0
                group-hover:opacity-100

                hover:bg-gray-900
            "
                                    >
                                        <IoCartOutline className="text-[17px]" />
                                        <span>Add To Cart</span>
                                    </button>
                                </div>

                                {/* Product Info */}
                                <div className="px-1 pt-4 pb-2">
                                    <p className="truncate text-[14px] font-medium text-gray-900">
                                        {p.title}
                                    </p>

                                    <div className="mt-2 flex items-center gap-3">
                                        <span className="text-[14px] font-semibold text-red-500">
                                            ${p.discount_price}
                                        </span>

                                        {p.discount_price !== p.price && (
                                            <span className="text-[12px] text-gray-400 line-through">
                                                ${p.price}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="flex justify-between py-10">
                    <Animate text="Just For You" />
                    <OutlineButton text={"See All"} />
                </div>
                <div className="py-10">
                    <Products />
                </div>
            </div>
        </div>
    )
}

export default Wishlist