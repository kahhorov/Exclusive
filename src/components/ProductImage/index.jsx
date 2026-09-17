import { FaRegEye, FaRegHeart } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api, { getImageUrl } from '../../Axios/Api'
import { useProductCounts } from '../../Context/productContext'
import ProductModal from '../ProductModal'
import { useState } from 'react'

function ProductImage({
    img,
    src,
    alt,
    isNew,
    height = 288,
    discount,
    productId
}) {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const { refreshWishlist } = useProductCounts()



    async function postWishlist(id) {
        if (!localStorage.getItem("token")) {
            toast.warning("Avval tizimga kiring")
            navigate("/login")
            return
        }
        try {
            await api.post(`action/add-to-wishlist/?product_id=${id}`)
            refreshWishlist()
            toast.success("Sevimlilarga qo'shildi")
        } catch (error) {
            console.log(error);
            toast.error("Xatolik yuz berdi")
        }
    }



    function handleSaveHeart(id, e) {
        e.stopPropagation()
        e.preventDefault()
        postWishlist(id)
    }

    return (
        <div
            className="relative w-full shrink-0 p-2 bg-gray-100 flex items-center justify-center overflow-hidden"
            style={{ height }}
        >
            <ProductModal isOpen={isOpen} setIsOpen={setIsOpen} productId={productId} />

            {isNew && (
                <span className="absolute top-3 left-3 bg-green100 text-white text-xs px-3 py-1 rounded-sm z-10">
                    NEW
                </span>
            )}

            {discount && (
                <span className="absolute top-3 left-3 bg-secondary-10 text-white text-xs px-3 py-1 rounded-sm z-10">
                    -{discount}%
                </span>
            )}

            <div className="absolute top-3 right-3 flex flex-col gap-2 z-20">

                <button
                    onClick={(e) => handleSaveHeart(productId, e)}
                    className="w-8 h-8 !rounded-full bg-white flex items-center justify-center hover:bg-secondary-10 hover:!text-white transition-colors duration-200"
                >
                    <FaRegHeart />
                </button>

                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                    }}
                    className="w-8 h-8 !rounded-full bg-white flex items-center justify-center hover:bg-secondary-10 hover:!text-white transition-colors duration-200"
                >
                    <FaRegEye />
                </button>

            </div>

            <Link to={`/product/detail/${productId}`} className="w-full h-full">
                <img
                    src={getImageUrl(img || src)}
                    alt={alt}
                    className="w-full h-full object-contain"
                />
            </Link>

            <button
                onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    setIsOpen(true)
                }}
                className="absolute bottom-0 left-0 w-full bg-black !text-white py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-linear z-20"
            >
                Add To Cart
            </button>

        </div>
    )
}

export default ProductImage