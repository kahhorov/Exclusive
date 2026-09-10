import Animate from "../../components/Animate"
import OutlineButton from "../../components/OutlineButton"
import Products from "../../components/products"
import { products } from "../../Data"
import { IoCartOutline, IoTrashOutline } from "react-icons/io5"

function Wishlist() {
    const cartProducts = products.filter((p) => p.category === "Flash-Sales")
    return (
        <div className="border-gray-300 border-t py-10">
            <div className="container">
                <div className="flex justify-between py-10">
                    <p className="!text-lg !font-light lg:text-xl lg:font-bold">Wishlist (4)</p>
                    <OutlineButton text={"Move All To Bag"} />

                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-10">
                    {cartProducts.map((p) => {
                        return (
                            <div
                                key={p.id}
                                className="group relative overflow-hidden rounded-xl bg-white"
                            >
                                <div className="relative flex  w-full h-[230px] items-center justify-center overflow-hidden rounded-xl bg-gray-100 p-5">

                                    <img
                                        src={p.img}
                                        alt={p.title}
                                        className="
                h-full w-full object-contain
                transition-all duration-500 ease-out
                group-hover:scale-105
            "
                                    />

                                    {p.discount && (
                                        <span
                                            className="
                    absolute left-2 top-2 z-20
                    rounded-md bg-secondary-10
                    px-2 py-1
                    text-[11px] font-medium text-white
                "
                                        >
                                            -{p.discount}%
                                        </span>
                                    )}

                                    {/* Trash Button */}
                                    <button
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
                                            ${p.price}
                                        </span>

                                        {p.discountedPrice && (
                                            <span className="text-[12px] text-gray-400 line-through">
                                                ${p.discountedPrice}
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